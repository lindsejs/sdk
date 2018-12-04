/*
 * Copyright 2015-present Boundless Spatial Inc., http://boundlessgeo.com
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations
 * under the License.
 */

import fetch from 'isomorphic-fetch';

import uuid from 'uuid';

import {featureFilter as createFilter} from '@mapbox/mapbox-gl-style-spec';

import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import {applyBackground, applyStyle} from 'ol-mapbox-style';

import OlMap from 'ol/Map';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import {defaults as interactionDefaults} from 'ol/interaction';

import PolygonGeom from 'ol/geom/Polygon';
import MultiPolygonGeom from 'ol/geom/MultiPolygon';

import {unByKey} from 'ol/Observable';

import {transform, transformExtent, toLonLat} from 'ol/proj';
import {toStringHDMS} from 'ol/coordinate';
import {getDistance, getArea} from 'ol/sphere';

import TileLayer from 'ol/layer/Tile';
import XyzSource from 'ol/source/XYZ';
import TileWMSSource from 'ol/source/TileWMS';
import TileJSON from 'ol/source/TileJSON';
import {createXYZ} from 'ol/tilegrid';

import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';

import MvtFormat from 'ol/format/MVT';
import RenderFeature from 'ol/render/Feature';

import ImageLayer from 'ol/layer/Image';
import ImageStaticSource from 'ol/source/ImageStatic';

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import GeoJsonFormat from 'ol/format/GeoJSON';
import EsriJsonFormat from 'ol/format/EsriJSON';

import DrawInteraction, {createBox} from 'ol/interaction/Draw';
import ModifyInteraction from 'ol/interaction/Modify';
import SelectInteraction from 'ol/interaction/Select';

import mb2olstyle from 'ol-mapbox-style/stylefunction';

import Style from 'ol/style/Style';
import SpriteStyle from '../style/sprite';

import AttributionControl from 'ol/control/Attribution';

import {bbox as bboxStrategy, all as allStrategy} from 'ol/loadingstrategy';

import {updateLayer, setView, setBearing} from '../actions/map';
import {setMapSize, setMousePosition, setMapExtent, setResolution, setProjection, setSourceError, clearSourceErrors, setMapLoaded, setMapLoading} from '../actions/mapinfo';
import {INTERACTIONS, LAYER_VERSION_KEY, SOURCE_VERSION_KEY, TIME_KEY, TIME_START_KEY, QUERYABLE_KEY, QUERY_ENDPOINT_KEY, QUERY_TYPE_KEY, QUERY_PARAMS_KEY, MIN_ZOOM_KEY, MAX_ZOOM_KEY, QUERY_TYPE_WFS, GEOMETRY_NAME_KEY, SOURCES_FETCH_OPTIONS_KEY} from '../constants';
import {dataVersionKey} from '../reducers/map';
import MapCommon, {MapRender} from './map-common';

import {finalizeMeasureFeature, setMeasureFeature, clearMeasureFeature} from '../actions/drawing';

import ClusterSource from '../source/cluster';

import {parseQueryString, jsonClone, jsonEquals, getLayerById, degreesToRadians, radiansToDegrees, getKey, encodeQueryObject, isLayerVisible} from '../util';

import fetchJsonp from 'fetch-jsonp';

import 'ol/ol.css';

/** @module components/map
 *
 * @desc Provide an OpenLayers map which reflects the
 *       state of the Redux store.
 */

const GEOJSON_FORMAT = new GeoJsonFormat();
const ESRIJSON_FORMAT = new EsriJsonFormat();
const MAPBOX_PROTOCOL = 'mapbox://';
const MAPBOX_HOST = 'api.mapbox.com/v4';
const BBOX_STRING = '{bbox-epsg-3857}';
const START = 'start';
const END = 'end';

/** This variant of getVersion() differs as it allows
 *  for undefined values to be returned.
 * @param {Object} obj The state.map object
 * @param {Object} obj.metadata The state.map.metadata object
 * @param {string} key One of 'bnd:layer-version', 'bnd:source-version', or 'bnd:data-version'.
 *
 * @returns {(number|undefined)} The version number of the given metadata key.
 */
function getVersion(obj, key) {
  if (obj.metadata === undefined) {
    return undefined;
  }
  return obj.metadata[key];
}

/**
 * Load a tile with full fetchOptions.
 *
 * This is only used when the Authorization header has been set
 * in the fetchOptions.
 *
 * @param {Object} fetchOptions Options to use for fetch calls.
 *
 * @returns {Function} Tile loading function which uses fetch.
 */
function authTileLoader(fetchOptions) {
  return function(tile, src) {
    fetch(src, fetchOptions)
      .then(r => r.blob())
      .then((imgData) => {
        tile.getImage().src = URL.createObjectURL(imgData);
      })
      .catch(() => {
        console.error('Error fetchimg image at:', src);
      });
  };
}

/**
 * Load a vector tile with full fetchOptions
 * This is only used when the Authorization header has been set
 * in the fetchOptions.
 *
 * @param {Object} fetchOptions Options to use for fetch calls.
 *
 * @returns {Function} Tile loading function which uses fetch.
 */
function authVectorTileLoader(fetchOptions) {
  return function(tile, url) {
    const loader = () => {
      fetch(url, fetchOptions)
        .then(r => r.arrayBuffer())
        .then((source) => {
          const format = tile.getFormat();
          tile.setProjection(format.readProjection(source));
          tile.setFeatures(format.readFeatures(source));
          tile.setExtent(format.getLastExtent());
        })
        .catch((err) => {
          tile.onError();
        });
    };

    tile.setLoader(loader);
  };
}

/** Configures an OpenLayers TileWMS or XyzSource object from the provided
 * Mapbox GL style object.
 * @param {Object} glSource The Mapbox GL map source containing a 'tiles' property.
 * @param {Object} mapProjection The OpenLayers projection object.
 * @param {string} time TIME parameter.
 * @param {Object} fetchOptions Options to use for fetch calls.
 *
 * @returns {Object} Configured OpenLayers TileWMSSource or XyzSource.
 */
function configureTileSource(glSource, mapProjection, time, fetchOptions) {
  const tile_url = glSource.tiles[0];
  const commonProps = {
    attributions: glSource.attribution,
    minZoom: glSource.minzoom,
    maxZoom: 'maxzoom' in glSource ? glSource.maxzoom : 22,
    tileSize: glSource.tileSize || 512,
    crossOrigin: 'crossOrigin' in glSource ? glSource.crossOrigin : 'anonymous',
    projection: mapProjection,
  };
  // when there is an authorization header, enable the async loader.
  if (fetchOptions.headers && fetchOptions.headers.get('Authorization')) {
    commonProps.tileLoadFunction = authTileLoader(fetchOptions);
  }
  // check to see if the url is a wms request.
  if (tile_url.toUpperCase().indexOf('SERVICE=WMS') >= 0) {
    const params = parseQueryString(tile_url.substring(tile_url.lastIndexOf('?') + 1));
    const keys = Object.keys(params);
    for (let i = 0, ii = keys.length; i < ii; ++i) {
      if (keys[i].toUpperCase() === 'REQUEST') {
        delete params[keys[i]];
      }
    }
    if (time) {
      params.TIME = time;
    }
    let layerProjection;
    if (params.CRS !== mapProjection.getCode()) {
      layerProjection = params.CRS;
    }
    return new TileWMSSource(Object.assign({
      url: tile_url.split('?')[0],
      params,
    }, commonProps, {projection: layerProjection}));
  } else {
    const source = new XyzSource(Object.assign({
      urls: glSource.tiles,
    }, commonProps));
    source.setTileLoadFunction(function(tile, src) {
      // copy the src string.
      let img_src = src.slice();
      if (src.indexOf(BBOX_STRING) !== -1) {
        const bbox = source.getTileGrid().getTileCoordExtent(tile.getTileCoord());
        img_src = src.replace(BBOX_STRING, bbox.toString());
      }

      // check to see if a cache invalidation has been requested.
      const ck = source.get('_ck');
      if (ck !== undefined) {
        img_src = addParam(img_src, '_ck', ck);
      }

      // disabled the linter below as this is how
      //  OpenLayers documents this operation.
      // eslint-disable-next-line
      tile.getImage().src = img_src;
    });
    if (glSource.scheme === 'tms') {
      source.setTileUrlFunction((tileCoord, pixelRatio, projection) => {
        const min = 0;
        const max = glSource.tiles.length - 1;
        const idx = Math.floor(Math.random() * (max - min + 1)) + min;
        const z = tileCoord[0];
        const x = tileCoord[1];
        const y = tileCoord[2] + (1 << z);

        let url = glSource.tiles[idx].replace('{z}', z).replace('{y}', y).replace('{x}', x);

        // add cache invalidation as requested.
        const ck = source.get('_ck');
        if (ck !== undefined) {
          url = addParam(url, '_ck', ck);
        }
        return url;
      });
    }
    return source;
  }
}

/** Gets the url for the TileJSON source.
 * @param {Object} glSource The Mapbox GL map source containing a 'url' property.
 * @param {string} accessToken The user's Mapbox tiles access token.
 *
 * @returns {string} The url to use (mapbox protocol substituted).
 */
export function getTileJSONUrl(glSource, accessToken) {
  let url = glSource.url;
  if (url.indexOf(MAPBOX_PROTOCOL) === 0) {
    const mapid = url.replace(MAPBOX_PROTOCOL, '');
    url = `https://${MAPBOX_HOST}/${mapid}.json?access_token=${accessToken}`;
  }
  return url;
}

/** Configures an OpenLayers TileJSONSource object from the provided
 * Mapbox GL style object.
 * @param {Object} glSource The Mapbox GL map source containing a 'url' property.
 * @param {string} accessToken The user's Mapbox tiles access token.
 *
 * @returns {Object} Configured OpenLayers TileJSONSource.
 */
function configureTileJSONSource(glSource, accessToken) {
  return new TileJSON({
    url: getTileJSONUrl(glSource, accessToken),
    crossOrigin: 'anonymous',
  });
}

/** Configures an OpenLayers ImageStaticSource object from the provided
 * Mapbox GL style object.
 * @param {Object} glSource The Mapbox GL map source of type 'image'.
 *
 * @returns {Object} Configured OpenLayers ImageStaticSource.
 */
function configureImageSource(glSource) {
  const coords = glSource.coordinates;
  return new ImageStaticSource({
    url: glSource.url,
    imageExtent: [coords[0][0], coords[3][1], coords[1][0], coords[0][1]],
    projection: 'EPSG:4326',
  });
}

/** Configures an OpenLayers VectorTileSource object from the provided
 * Mapbox GL style object.
 * @param {Object} glSource The Mapbox GL map source of type 'vector'.
 * @param {string} accessToken The user's Mapbox tiles access token .
 * @param {Object} fetchOptions Options to use for fetch calls.
 *
 * @returns {Object} Configured OpenLayers VectorTileSource.
 */
function configureMvtSource(glSource, accessToken, fetchOptions) {
  if (glSource.tiles) {
    return new Promise((resolve, reject) => {
      // predefine the source in-case since it's needed for the tile_url_fn
      let source;
      let tile_url_fn;
      let tile_load_fn;
      // check the first tile to see if we need to do BBOX subsitution
      if (glSource.tiles[0].indexOf(BBOX_STRING) !== -1) {
        tile_url_fn = function(urlTileCoord, pixelRatio, projection) {
          // copy the src string.
          let img_src = glSource.tiles[0].slice();
          // check to see if a cache invalidation has been requested.
          const ck = source.get('_ck');
          if (ck !== undefined) {
            img_src = addParam(img_src, '_ck', ck);
          }
          const bbox = source.getTileGrid().getTileCoordExtent(urlTileCoord);
          return img_src.replace(BBOX_STRING, bbox.toString());
        };
      }
      if (fetchOptions.headers && fetchOptions.headers.get('Authorization')) {
        tile_load_fn = authVectorTileLoader(fetchOptions);
      }
      source = new VectorTileSource({
        urls: glSource.tiles,
        tileGrid: createXYZ({
          tileSize: 512,
          maxZoom: 'maxzoom' in glSource ? glSource.maxzoom : 22,
          minZoom: glSource.minzoom,
        }),
        attributions: glSource.attribution,
        format: new MvtFormat(),
        crossOrigin: 'crossOrigin' in glSource ? glSource.crossOrigin : 'anonymous',
        tileUrlFunction: tile_url_fn,
        tileLoadFunction: tile_load_fn,
      });
      resolve(source);
    });
  } else {
    let url = getTileJSONUrl(glSource, accessToken);
    return fetch(url, fetchOptions).then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
      .then((json) => {
        return new VectorTileSource({
          crossOrigin: 'crossOrigin' in glSource ? glSource.crossOrigin : 'anonymous',
          attributions: json.attribution,
          format: new MvtFormat(),
          tileGrid: createXYZ({
            minZoom: json.minzoom,
            maxZoom: json.maxzoom,
            tileSize: 512
          }),
          urls: json.tiles,
        });
      });
  }
}

function addParam(url, paramName, paramValue) {
  let new_url = '' + url;
  if (new_url.indexOf('?') >= 0) {
    new_url += '&';
  } else {
    new_url += '?';
  }
  new_url += paramName + '=' + paramValue;

  return new_url;
}

function getLoaderFunction(glSource, mapProjection, baseUrl, fetchOptions) {
  return function(bbox, resolution, projection) {
    // setup a feature promise to handle async loading
    // of features.
    let features_promise;

    // if the data is a string, assume it's a url
    if (typeof glSource.data === 'string') {
      let url = glSource.data;
      // if the baseUrl is present and the url does not
      // start with http:// or "https://" then assume the path is
      // relative to the style doc.
      if (!(url.indexOf('https://') === 0 || url.indexOf('http://') === 0)) {
        if (baseUrl && url.indexOf('.') === 0) {
          url = url.substring(1);
        }
        url = baseUrl + url;
      }
      // check to see if the bbox strategy should be employed
      //  for this source.
      if (url.indexOf(BBOX_STRING) >= 0) {
        url = url.replace(BBOX_STRING, bbox.toString());
      }

      // check to see if a cache invalidation has been requested.
      const ck = this.get('_ck');
      if (ck !== undefined) {
        url = addParam(url, '_ck', ck);
      }
      features_promise = fetch(url, fetchOptions).then(response => response.json());
    } else if (typeof glSource.data === 'object'
      && (glSource.data.type === 'Feature' || glSource.data.type === 'FeatureCollection')) {
      features_promise = new Promise((resolve) => {
        resolve(glSource.data);
      });
    }

    // if data is undefined then no promise would
    // have been created.
    if (features_promise) {
      // when the feature promise resolves,
      // add those features to the source.
      features_promise.then((features) => {
        // features could be null, in which case there
        //  are no features to add.
        if (features) {
          // setup the projection options.
          const readFeatureOpt = {featureProjection: mapProjection};

          // bulk load the feature data
          this.addFeatures(GEOJSON_FORMAT.readFeatures(features, readFeatureOpt));
        }
      }).catch((error) => {
        // use the event name tileloaderror for consistency.
        this.dispatchEvent('tileloaderror');
        console.error(error);
      });
    }
  };
}

function updateGeojsonSource(olSource, glSource, mapView, baseUrl, fetchOptions) {
  let src = olSource;
  if (glSource.cluster) {
    src = olSource.getSource();
  }

  // update the loader function based on the glSource definition
  src.loader_ = getLoaderFunction(glSource, mapView.getProjection(), baseUrl, fetchOptions);

  const numFeatures = src.getFeatures().length;

  // clear the layer WITHOUT dispatching remove events.
  src.clear(true);

  if (numFeatures === 0) {
    // force a refresh
    src.loadFeatures(mapView.calculateExtent(), mapView.getResolution(), mapView.getProjection());
  }
}


/** Create a vector source based on a
 *  Mapbox GL styles definition.
 *
 *  @param {Object} glSource A Mapbox GL styles defintiion of the source.
 *  @param {Object} mapView The OpenLayers map view.
 *  @param {string} baseUrl The mapbox base url.
 *  @param {boolean} wrapX Should we wrap the world?
 *  @param {Object} fetchOptions Options to use for fetch calls.
 *
 *  @returns {Object} ol.source.vector instance.
 */
function configureGeojsonSource(glSource, mapView, baseUrl, wrapX, fetchOptions) {
  const use_bbox = (typeof glSource.data === 'string' && glSource.data.indexOf(BBOX_STRING) >= 0);
  const vector_src = new VectorSource({
    strategy: use_bbox ? bboxStrategy : allStrategy,
    loader: getLoaderFunction(glSource, mapView.getProjection(), baseUrl, fetchOptions),
    useSpatialIndex: true,
    wrapX: wrapX,
  });

  // GeoJson sources can be clustered but OpenLayers
  // uses a special source type for that. This handles the
  // "switch" of source-class.
  let new_src = vector_src;
  if (glSource.cluster) {
    new_src = new ClusterSource({
      source: vector_src,
      // default the distance to 50 as that's what
      //  is specified by Mapbox.
      distance: glSource.clusterRadius ? glSource.clusterRadius : 50,
    });
  }

  // seed the vector source with the first update
  //  before returning it.
  updateGeojsonSource(new_src, glSource, mapView, baseUrl, fetchOptions);
  return new_src;
}

/** Configures a Mapbox GL source object into appropriate
 *  an appropriatly typed OpenLayers source object.
 * @param {Object} glSource The source object.
 * @param {Object} mapView The OpenLayers view object.
 * @param {string} accessToken A Mapbox access token.
 * @param {string} baseUrl A baseUrl provided by this.props.mapbox.baseUrl.
 * @param {string} time The current time if time-enabled.
 * @param {boolean} wrapX Should we wrap the world?
 * @param {Object} fetchOptions Options to use for fetch calls.
 *
 * @returns {(Object|null)} Callback to the applicable configure source method.
 */
function configureSource(glSource, mapView, accessToken, baseUrl, time, wrapX, fetchOptions) {
  let src;
  // tiled raster layer.
  if (glSource.type === 'raster') {
    if ('tiles' in glSource) {
      src = configureTileSource(glSource, mapView.getProjection(), time, fetchOptions);
    } else if (glSource.url) {
      src = configureTileJSONSource(glSource, accessToken);
    }
  } else if (glSource.type === 'geojson') {
    src = configureGeojsonSource(glSource, mapView, baseUrl, wrapX, fetchOptions);
  } else if (glSource.type === 'image') {
    src = configureImageSource(glSource);
  } else if (glSource.type === 'vector') {
    return configureMvtSource(glSource, accessToken, fetchOptions);
  }
  return new Promise((resolve, reject) => {
    resolve(src);
  });
}

/** Create a unique key for a group of layers
 * @param {Object[]} layer_group An array of Mapbox GL layers.
 *
 * @returns {string} The layer_group source name, followed by a concatenated string of layer ids.
 */
function getLayerGroupName(layer_group) {
  const all_names = [];
  for (let i = 0, ii = layer_group.length; i < ii; i++) {
    all_names.push(layer_group[i].id);
  }
  return `${layer_group[0].source}-${all_names.join(',')}`;
}

/** Get the source name from the layer group name.
 * @param {string} groupName The layer group name.
 *
 * @returns {string} The source name for the provided layer group name.
 */
function getSourceName(groupName) {
  const dash = groupName.indexOf('-');
  return groupName.substring(0, dash);
}

/** Populate a ref'd layer.
 * @param {Object[]} layersDef All layers defined in the Mapbox GL stylesheet.
 * @param {Object} glLayer Subset of layers to be rendered as a group.
 *
 * @returns {Object} A new glLayer object with ref'd layer properties mixed in.
 */
export function hydrateLayer(layersDef, glLayer) {
  // Small sanity check for when this
  // is blindly called on any layer.
  if (glLayer === undefined || glLayer.ref === undefined) {
    return glLayer;
  }

  const ref_layer = getLayerById(layersDef, glLayer.ref);

  // default the layer definition to return to
  // the layer itself, incase we can't find the ref layer.
  let layer_def = glLayer;

  // ensure the ref layer is SOMETHING.
  if (ref_layer) {
    // clone the gl layer
    layer_def = jsonClone(glLayer);
    // remove the reference
    delete layer_def.ref;
    // mixin the layer_def to the ref layer.
    layer_def = Object.assign({}, ref_layer, layer_def);
  }
  // return the new layer.
  return layer_def;
}

/** Hydrate a layer group
 *  Normalizes all the ref layers in a group.
 *
 *  @param {Object[]} layersDef All layers defined in the Mapbox GL stylesheet.
 *  @param {Object[]} layerGroup Subset of layers to be rendered as a group.
 *
 *  @returns {Object[]} An array with the ref layers normalized.
 */
function hydrateLayerGroup(layersDef, layerGroup) {
  const hydrated_group = [];
  for (let i = 0, ii = layerGroup.length; i < ii; i++) {
    // hydrateLayer checks for "ref"
    hydrated_group.push(hydrateLayer(layersDef, layerGroup[i]));
  }
  return hydrated_group;
}

export function getFakeStyle(sprite, layers, sources, baseUrl, accessToken) {
  const fake_style = {
    version: 8,
    sprite,
    layers,
    sources,
  };
  if (sprite && sprite.indexOf(MAPBOX_PROTOCOL) === 0) {
    fake_style.sprite = `${baseUrl}/sprite?access_token=${accessToken}`;
  }
  return fake_style;
}

export class Map extends React.Component {

  constructor(props) {
    super(props);

    this.loadCounter = 0;

    this.sourcesVersion = null;
    this.layersVersion = null;

    // keep a version of the sources in
    //  their OpenLayers source definition.
    this.sources = {};

    // hash of the openlayers layers in the map.
    this.layers = {};

    // popups and their elements are stored as an ID managed hash.
    this.popups = {};
    this.elems = {};

    // interactions are how the user can manipulate the map,
    //  this tracks any active interaction.
    this.activeInteractions = null;

    this.render = MapRender.bind(this);
  }

  componentDidMount() {
    // put the map into the DOM
    this.configureMap();
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.setTarget(null);
    }
  }

  /** This will check prevProps versus this.props to see what needs to be updated on the map.
   * @param {Object} prevProps The next properties of this component.
   */
  componentDidUpdate(prevProps) {
    const old_time = getKey(prevProps.map.metadata, TIME_KEY);

    const new_time = getKey(this.props.map.metadata, TIME_KEY);

    const force_redraw = this.props.requestedRedraws !== prevProps.requestedRedraws;
    const force_source_redraw = !jsonEquals(this.props.sourceRedraws, prevProps.sourceRedraws);
    if (old_time !== new_time) {
      // find time dependent layers
      for (let i = 0, ii = this.props.map.layers.length; i < ii; ++i) {
        const layer = this.props.map.layers[i];
        if (layer.metadata[TIME_START_KEY] !== undefined) {
          this.props.updateLayer(layer.id, {
            filter: this.props.createLayerFilter(layer, this.props.map.metadata[TIME_KEY])
          });
        }
        if (layer.metadata[TIME_KEY] !== undefined) {
          const source = layer.source;
          const olSource = this.sources[source];
          if (olSource && olSource instanceof TileWMSSource) {
            olSource.updateParams({TIME: this.props.map.metadata[TIME_KEY]});
          }
        }
      }
    }

    // Force WMS-type layers to refresh.
    if (force_redraw || force_source_redraw) {
      let timestamp;
      if (force_redraw) {
        timestamp = (new Date()).getTime();
      }
      for (const key in this.sources) {
        const src = this.sources[key];
        if (force_source_redraw) {
          timestamp = this.props.sourceRedraws[key];
        }
        if (timestamp) {
          if (typeof src.updateParams === 'function') {
            src.updateParams({'_CK': timestamp});
          } else {
            // set the time stamp for other loaders which
            //  check for the _ck attribute.
            src.set('_ck', timestamp);
            if (typeof src.clear === 'function') {
              src.clear();
            }
            src.refresh();
          }
        }
      }
    }

    const map_view = this.map.getView();
    const map_proj = map_view.getProjection();

    // compare the centers
    if (this.props.map.center !== undefined) {
      // center has not been set yet or differs
      if (prevProps.map.center === undefined ||
        (prevProps.map.center[0] !== this.props.map.center[0]
        || prevProps.map.center[1] !== this.props.map.center[1])) {
        // convert the center point to map coordinates.
        const center = transform(this.props.map.center, 'EPSG:4326', map_proj);
        map_view.setCenter(center);
      }
    }
    // compare the zoom
    if (this.props.map.zoom !== undefined && (this.props.map.zoom !== prevProps.map.zoom)) {
      map_view.setZoom(this.props.map.zoom + 1);
    }
    // compare the rotation
    if (this.props.map.bearing !== undefined && this.props.map.bearing !== prevProps.map.bearing) {
      const rotation = degreesToRadians(this.props.map.bearing);
      map_view.setRotation(-rotation);
    }

    // check the sources diff
    const next_sources_version = getVersion(this.props.map, SOURCE_VERSION_KEY);
    const next_layer_version = getVersion(this.props.map, LAYER_VERSION_KEY);

    // default to the source-configuration promise to being resolved.
    let sources_promise = new Promise((resolve, reject) => {
      resolve(true);
    });

    if (this.sourcesVersion !== next_sources_version || force_redraw) {
      sources_promise = this.configureSources(this.props.map.sources, next_sources_version, prevProps)
        .then(() => {
          this.configureLayers(this.props.map.sources, this.props.map.layers, next_layer_version, this.props.map.sprite, this.props.declutter, prevProps);
        }).catch((error) => {
          console.error('An error occured.', error);
        });
    } else if (this.layersVersion !== next_layer_version) {
      this.configureLayers(this.props.map.sources, this.props.map.layers, next_layer_version, this.props.map.sprite, this.props.declutter, prevProps);
    }

    // wait for the sources to be ready.
    const props = prevProps;
    sources_promise
      .then(() => {
        // check the vector sources for data changes
        const src_names = Object.keys(this.props.map.sources);
        for (let i = 0, ii = src_names.length; i < ii; i++) {
          const src_name = src_names[i];
          const src = props.map.sources[src_name];
          if (src && src.type === 'geojson') {
            const version_key = dataVersionKey(src_name);


            if (force_redraw || (props.map.metadata !== undefined &&
                props.map.metadata[version_key] !== this.props.map.metadata[version_key])) {
              const next_src = this.props.map.sources[src_name];
              updateGeojsonSource(this.sources[src_name], next_src, map_view, props.mapbox.baseUrl, this.getFetchOptions(props, src_name));
            }
          }
        }
      })
      .catch((error) => {
        console.error('An error occured.', error);
      });

    // do a quick sweep to remove any popups
    //  that have been closed.
    this.updatePopups();

    // change the current interaction as needed
    if (this.props.drawing) {
      if (this.props.drawing.interaction !== prevProps.drawing.interaction || this.props.drawing.sourceName !== prevProps.drawing.sourceName) {
        this.updateInteraction(this.props.drawing);
      }
      if (this.props.drawing.measureFinishGeometry) {
        this.finishMeasureGeometry();
      }
    }

    if (this.props.print && this.props.print.exportImage) {
      // this uses the canvas api to get the map image
      this.map.once('postcompose', (evt) => {
        try {
          evt.context.canvas.toBlob(this.props.onExportImage);
        } catch (err) {
          console.error('Failed To Export Map as Image', err);
        }
      }, this);
      this.map.renderSync();
    }

    if (force_redraw || !jsonEquals(this.props.size, prevProps.size)) {
      this.map.updateSize();
    }
  }

  /** Callback for finished drawings, converts the event's feature
   *  to GeoJSON and then passes the relevant information on to
   *  this.props.onFeatureDrawn, this.props.onFeatureModified,
   *  or this.props.onFeatureSelected, this.props.onFeatureDeselected.
   *
   *  @param {string} eventType One of 'drawn', 'modified', 'selected' or 'deselected'.
   *  @param {string} sourceName Name of the geojson source.
   *  @param {Object[]} features OpenLayers feature objects.
   *  @param {string} interaction The interaction that triggered this event.
   *
   */
  onFeatureEvent(eventType, sourceName, features, interaction) {
    // convert the features to GeoJson
    const proposed_geojson = GEOJSON_FORMAT.writeFeaturesObject(features, {
      dataProjection: 'EPSG:4326',
      featureProjection: this.map.getView().getProjection(),
    });
    // Pass on this map object, the target source and the features.
    if (eventType === 'drawn') {
      this.props.onFeatureDrawn(this, sourceName, proposed_geojson, interaction);
    } else if (eventType === 'modified') {
      this.props.onFeatureModified(this, sourceName, proposed_geojson);
    } else if (eventType === 'selected') {
      this.props.onFeatureSelected(this, sourceName, proposed_geojson);
    } else if (eventType === 'deselected') {
      this.props.onFeatureDeselected(this, sourceName, proposed_geojson);
    }
  }

  onLoadEvents(eventType) {
    if (eventType === START) {
      this.loadCounter = this.loadCounter + 1;
    } else if (eventType === END) {
      this.loadCounter = this.loadCounter - 1;
    }
    if (this.loadCounter > 0 && this.props.loading !== true) {
      this.props.setMapLoading();
    }
    if (this.loadCounter === 0 && this.props.loading !== false) {
      this.props.setMapLoaded();
    }
  }

  getFetchOptions(props, src_name) {
    let fetchOptions = props.fetchOptions;
    if (props.map.metadata[SOURCES_FETCH_OPTIONS_KEY] && props.map.metadata[SOURCES_FETCH_OPTIONS_KEY][src_name]) {
      fetchOptions = Object.assign({}, props.map.metadata[SOURCES_FETCH_OPTIONS_KEY][src_name]);
      if (fetchOptions.headers) {
        fetchOptions.headers = new Headers(fetchOptions.headers);
      }
    }
    return fetchOptions;
  }

  /** Convert the GL source definitions into internal
   *  OpenLayers source definitions.
   *  @param {Object} sourcesDef All sources defined in the Mapbox GL stylesheet.
   *  @param {number} sourceVersion Counter for the source metadata updates.
   *  @param {Object} prevProps Previous properties of the component.
   *
   *  @returns {Promise} When all sources are done, the promise is resolved.
   */
  configureSources(sourcesDef, sourceVersion, prevProps) {
    const promises = [];
    // TODO: Update this to check "diff" configurations
    //       of sources.  Currently, this will only detect
    //       additions and removals.
    let src_names = Object.keys(sourcesDef);
    const map_view = this.map.getView();

    const sourceError = this.props.setSourceError;
    const listenForError = (src_name, source) => {
      source.on('tileloaderror', () => {
        sourceError(src_name);
      });
    };

    const listenForLoad = (source) => {
      source.on('tileloadstart', () => {
        this.onLoadEvents(START);
      });
      source.on('tileloadend', () => {
        this.onLoadEvents(END);
      });
      source.on('tileloaderror', () => {
        this.onLoadEvents(END);
      });
    };

    const addSource = function(src_name, source) {
      if (source) {
        this.sources[src_name] = source;
        listenForError(src_name, source);
        listenForLoad(source);
      }
    };
    const addAndUpdateSource = function(src_name, source) {
      if (source) {
        this.sources[src_name] = source;
        this.updateLayerSource(src_name);
        listenForError(src_name, source);
        listenForLoad(source);
      }
    };


    for (let i = 0, ii = src_names.length; i < ii; i++) {
      const src_name = src_names[i];
      // Add the source because it's not in the current
      //  list of sources.
      if (!(src_name in this.sources)) {
        const time = getKey(this.props.map.metadata, TIME_KEY);
        promises.push(configureSource(sourcesDef[src_name], map_view,
          this.props.mapbox.accessToken, this.props.mapbox.baseUrl, time, this.props.wrapX, this.getFetchOptions(this.props, src_name))
          .then(addSource.bind(this, src_name)));
      }
      const src = prevProps ? prevProps.map.sources[src_name] : this.props.map.sources[src_name];
      if (src && src.type !== 'geojson' && !jsonEquals(src, sourcesDef[src_name])) {
        // reconfigure source and tell layers about it
        promises.push(configureSource(
          sourcesDef[src_name],
          map_view,
          this.props.mapbox.accessToken,
          this.props.mapbox.baseUrl,
          undefined,
          this.props.wrapX,
          this.getFetchOptions(this.props, src_name),
        )
          .then(addAndUpdateSource.bind(this, src_name)));
      }

      // Check to see if there was a clustering change.
      // Because OpenLayers requires a *different* source to handle clustering,
      // this handles update the named source and then subsequently updating
      // the layers.
      if (src && (src.cluster !== sourcesDef[src_name].cluster
          || src.clusterRadius !== sourcesDef[src_name].clusterRadius)) {
        // reconfigure the source for clustering.
        promises.push(configureSource(
          sourcesDef[src_name],
          map_view,
          this.props.mapbox.accessToken,
          this.props.mapbox.baseUrl,
          undefined,
          this.props.wrapX,
          this.getFetchOptions(this.props, src_name),
        ).then(addAndUpdateSource.bind(this, src_name)));
      }
    }

    // remove sources no longer there.
    src_names = Object.keys(this.sources);
    for (let i = 0, ii = src_names.length; i < ii; i++) {
      const src_name = src_names[i];
      if (!(src_name in sourcesDef)) {
        // TODO: Remove all layers that are using this source.
        delete this.sources[src_name];
      }
    }
    return Promise.all(promises).then(() => {
      this.sourcesVersion = sourceVersion;
    });
  }

  /** Applies the sprite animation information to the layer
   *  @param {Object} olLayer OpenLayers layer object.
   *  @param {Object[]} layers Array of Mapbox GL layer objects.
   */
  applySpriteAnimation(olLayer, layers) {
    this.map.on('postcompose', (e) => {
      this.map.render(); // animate
    });
    const styleCache = {};
    const spriteOptions = {};
    for (let i = 0, ii = layers.length; i < ii; ++i) {
      const layer = layers[i];
      spriteOptions[layer.id] = jsonClone(layer.metadata['bnd:animate-sprite']);
      if (Array.isArray(layer.filter)) {
        layer.filter = createFilter(layer.filter);
      }
    }
    olLayer.setStyle((feature, resolution) => {
      // loop over the layers to see which one matches
      for (let l = 0, ll = layers.length; l < ll; ++l) {
        const layer = layers[l];
        if (!layer.filter || layer.filter(undefined, {properties: feature.getProperties()})) {
          if (!spriteOptions[layer.id].rotation || (spriteOptions[layer.id].rotation && !spriteOptions[layer.id].rotation.property)) {
            if (!styleCache[layer.id]) {
              const sprite = new SpriteStyle(spriteOptions[layer.id]);
              styleCache[layer.id] = new Style({image: sprite});
              this.map.on('postcompose', (e) => {
                sprite.update(e);
              });
            }
            return styleCache[layer.id];
          } else {
            if (!styleCache[layer.id]) {
              styleCache[layer.id] = {};
            }
            const rotationAttribute = spriteOptions[layer.id].rotation.property;
            const rotation = feature.get(rotationAttribute);
            if (!styleCache[layer.id][rotation]) {
              const options = jsonClone(layer.metadata['bnd:animate-sprite']);
              options.rotation = rotation;
              const sprite = new SpriteStyle(options);
              const style = new Style({image: sprite});
              this.map.on('postcompose', (e) => {
                sprite.update(e);
              });
              styleCache[layer.id][rotation] = style;
            }
            return styleCache[layer.id][rotation];
          }
        }
      }
      return null;
    });
  }

  /** Configures OpenLayers layer style.
   *  @param {Object} olLayer OpenLayers layer object.
   *  @param {Object[]} layers Array of Mapbox GL layer objects.
   *  @param {string} sprite The sprite of the map.
   *  @param {Object} glSource The Mapbox GL soure definition.
   */
  applyStyle(olLayer, layers, sprite, glSource) {
    // filter out the layers which are not visible
    const render_layers = [];
    const spriteLayers = [];
    for (let i = 0, ii = layers.length; i < ii; i++) {
      const layer = layers[i];
      if (layer.metadata && layer.metadata['bnd:animate-sprite']) {
        spriteLayers.push(layer);
      }
      const is_visible = isLayerVisible(layer);
      if (is_visible) {
        render_layers.push(layer);
      }
    }
    if (spriteLayers.length > 0) {
      this.applySpriteAnimation(olLayer, spriteLayers);
    }
    const sources = {};
    sources[layers[0].source] = glSource;
    const fake_style = getFakeStyle(
      sprite || this.props.map.sprite,
      render_layers,
      sources,
      this.props.mapbox.baseUrl,
      this.props.mapbox.accessToken,
    );
    if (olLayer.setStyle && spriteLayers.length === 0) {
      applyStyle(olLayer, fake_style, layers[0].source).catch((error) => {
        console.error('An error occured.', error);
      });
    }

    if (layers.length === 1 && layers[0].type === 'raster') {
      if (layers[0].paint && layers[0].paint['raster-opacity'] !== undefined) {
        olLayer.setOpacity(layers[0].paint['raster-opacity']);
      }
    }

    // handle toggling the layer on or off
    olLayer.setVisible(render_layers.length > 0);
  }

  /** Convert a Mapbox GL-defined layer to an OpenLayers layer.
   *  @param {string} sourceName Layer's source name.
   *  @param {Object} glSource Mapbox GL source object.
   *  @param {Object[]} layers Array of Mapbox GL layer objects.
   *  @param {string} sprite The sprite of the map.
   *  @param {boolean} declutter Should we declutter labels and symbols?
   *  @param {number} idx The index in the layer stack.
   *
   *  @returns {(Object|null)} Configured OpenLayers layer object, or null.
   */
  configureLayer(sourceName, glSource, layers, sprite, declutter, idx) {
    const source = this.sources[sourceName];
    let layer = null;
    switch (glSource.type) {
      case 'raster':
        layer = new TileLayer({
          source,
          zIndex: idx,
          opacity: layers[0].paint ? layers[0].paint['raster-opacity'] : undefined,
        });
        this.applyStyle(layer, layers, sprite, glSource);
        return layer;
      case 'geojson':
        layer = new VectorLayer({
          declutter: declutter,
          zIndex: idx,
          source,
        });
        this.applyStyle(layer, layers, sprite, glSource);
        return layer;
      case 'vector':
        const time = getKey(this.props.map.metadata, TIME_KEY);
        if (time && layers[0].metadata && layers[0].metadata[TIME_START_KEY] !== undefined) {
          layers[0].filter = this.props.createLayerFilter(layers[0], time);
        }
        const tileGrid = source.getTileGrid();
        layer = new VectorTileLayer({
          maxResolution: tileGrid.getMinZoom() > 0 ? tileGrid.getResolution(tileGrid.getMinZoom()) : undefined,
          declutter: declutter,
          zIndex: idx,
          source,
        });
        this.applyStyle(layer, layers, sprite, glSource);
        return layer;
      case 'image':
        return new ImageLayer({
          source,
          zIndex: idx,
          opacity: layers[0].paint ? layers[0].paint['raster-opacity'] : undefined,
        });
      default:
        // pass, let the function return null
    }

    // this didn't work out.
    return null;
  }

  /** Update a layer source, provided its name.
   *  @param {string} sourceName Layer's source name.
   */
  updateLayerSource(sourceName) {
    const layer_names = Object.keys(this.layers);
    for (let i = 0, ii = layer_names.length; i < ii; i++) {
      const name = layer_names[i];
      if (getSourceName(name) === sourceName) {
        this.layers[name].setSource(this.sources[sourceName]);
      }
    }
  }

  /** Updates the rendered OpenLayers layers
   *  based on the current Redux state.map.layers.
   *  @param {string[]} layerNames An array of layer names.
   */
  cleanupLayers(layerNames) {
    const layer_exists = {};
    for (let i = 0, ii = layerNames.length; i < ii; i++) {
      layer_exists[layerNames[i]] = true;
    }

    // check for layers which should be removed.
    const layer_ids = Object.keys(this.layers);
    for (let i = 0, ii = layer_ids.length; i < ii; i++) {
      const layer_id = layer_ids[i];
      // if the layer_id was not set to true then
      //  it has been removed from the state and needs to be removed
      //  from the map.
      if (layer_exists[layer_id] !== true) {
        this.map.removeLayer(this.layers[layer_id]);
        delete this.layers[layer_id];
      }
    }
  }

  /** Configures the layers in the state
   *  and performs updates to the rendered layers as necessary.
   *  @param {Object[]} sourcesDef The array of sources in map.state.
   *  @param {Object[]} layersDef The array of layers in map.state.
   *  @param {number} layerVersion The value of state.map.metadata[LAYER_VERSION_KEY].
   *  @param {string} sprite The sprite of the map.
   *  @param {boolean} declutter Should we declutter labels and symbols?
   *  @param {Object} prevProps Previous properties of the component.
   */
  configureLayers(sourcesDef, layersDef, layerVersion, sprite, declutter, prevProps) {
    // update the internal version counter.
    this.layersVersion = layerVersion;
    // bin layers into groups based on their source.
    const layer_groups = [];

    let last_source = null;
    let layer_group = [];
    for (let i = 0, ii = layersDef.length; i < ii; i++) {
      let layer = layersDef[i];

      // fake the "layer" by getting the source
      //  from the ref'd layer.
      if (layer.ref !== undefined) {
        layer = {
          source: getLayerById(layersDef, layer.ref).source,
        };
      }

      // if the layers differ start a new layer group
      if (last_source === null || last_source !== layer.source) {
        if (layer_group.length > 0) {
          layer_groups.push(layer_group);
          layer_group = [];
        }
      }
      last_source = layer.source;

      layer_group.push(layersDef[i]);
    }
    if (layer_group.length > 0) {
      layer_groups.push(layer_group);
    }

    const group_names = [];
    for (let i = 0, ii = layer_groups.length; i < ii; i++) {
      const lyr_group = layer_groups[i];
      const group_name = getLayerGroupName(lyr_group);
      group_names.push(group_name);

      const source_name = hydrateLayer(layersDef, lyr_group[0]).source;
      const source = sourcesDef[source_name];

      // if the layer is not on the map, create it.
      if (!(group_name in this.layers)) {
        if (lyr_group[0].type === 'background') {
          applyBackground(this.map, {layers: lyr_group});
        } else {
          const hydrated_group = hydrateLayerGroup(layersDef, lyr_group);
          const new_layer = this.configureLayer(source_name, source, hydrated_group, sprite, declutter, i);

          // if the new layer has been defined, add it to the map.
          if (new_layer !== null) {
            new_layer.set('name', group_name);
            this.layers[group_name] = new_layer;
            this.map.addLayer(this.layers[group_name]);
          }
        }
      } else {
        const ol_layer = this.layers[group_name];

        // check for style changes, the OL style
        // is defined by filter and paint elements.
        const current_layers = [];
        for (let j = 0, jj = lyr_group.length; j < jj; j++) {
          current_layers.push(getLayerById(prevProps ? prevProps.map.layers : this.props.map.layers, lyr_group[j].id));
        }
        if (!jsonEquals(lyr_group, current_layers)) {
          this.applyStyle(ol_layer, hydrateLayerGroup(layersDef, lyr_group), sprite, source);
        }

        // update the min/maxzooms
        const view = this.map.getView();
        if (source.minzoom) {
          ol_layer.setMaxResolution(view.getResolutionForZoom(source.minzoom));
        }
        if (source.maxzoom) {
          ol_layer.setMinResolution(view.getResolutionForZoom(source.maxzoom));
        }

        // update the display order.
        ol_layer.setZIndex(i);
      }
    }

    // clean up layers which should be removed.
    this.cleanupLayers(group_names);
  }

  /** Removes popups from the map via OpenLayers removeOverlay().
   */
  updatePopups() {
    const overlays = this.map.getOverlays();
    const overlays_to_remove = [];

    overlays.forEach((overlay) => {
      const id = overlay.get('popupId');
      if (this.popups[id].state.closed !== false) {
        this.popups[id].setMap(null);
        // mark this for removal
        overlays_to_remove.push(overlay);
        // umount the component from the DOM
        ReactDOM.unmountComponentAtNode(this.elems[id]);
        // remove the component from the popups hash
        delete this.popups[id];
        delete this.elems[id];
      }
    });

    // remove the old/closed overlays from the map.
    for (let i = 0, ii = overlays_to_remove.length; i < ii; i++) {
      this.map.removeOverlay(overlays_to_remove[i]);
    }
  }

  removePopup(popupId) {
    this.popups[popupId].close();
    this.updatePopups();
  }

  /** Add a Popup to the map.
   *
   *  @param {SdkPopup} popup Instance of SdkPopop or a subclass.
   *  @param {boolean} silent When true, do not call updatePopups() after adding.
   *  @param {boolean} stopEvent Should the created overlay stop events.
   *
   */
  addPopup(popup, silent = false, stopEvent = false) {
    // each popup uses a unique id to relate what is
    //  in openlayers vs what we have in the react world.
    const id = uuid.v4();

    const elem = document.createElement('div');
    elem.setAttribute('class', 'sdk-popup');
    const overlay = new Overlay({
      // create an empty div element for the Popup
      element: elem,
      // if false, allow events to pass through, using the default stopevent
      // container does not allow react to check for events.
      stopEvent: stopEvent,
      // put the popup into view
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    // Editor's note:
    // I hate using the self = this construction but
    //  there were few options when needing to get the
    //  instance of the react component using the callback
    //  method recommened by eslint and the react team.
    // See here:
    // - https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md
    const self = this;
    // render the element into the popup's DOM.
    ReactDOM.render(popup, elem, (function addInstance() {
      self.popups[id] = this;
      self.elems[id] = elem;
      this.setMap(self);
    }));

    // set the popup id so we can match the component
    //  to the overlay.
    overlay.set('popupId', id);

    // Add the overlay to the map,
    this.map.addOverlay(overlay);

    // reset the position after the popup has been added to the map.
    // assumes the popups coordinate is 4326
    const wgs84 = [popup.props.coordinate[0], popup.props.coordinate[1]];
    const xy = transform(wgs84, 'EPSG:4326', this.map.getView().getProjection());
    overlay.setPosition(xy);

    // do not trigger an update if silent is
    //  set to true.  Useful for bulk popup additions.
    if (silent !== true) {
      this.updatePopups();
    }
  }

  /** Handles async (WMS, ArcGIS rest) GetFeatureInfo for a given map event.
   *
   *  @param {Object} layer Mapbox GL layer object.
   *  @param {Promise[]} promises Features promies.
   *  @param {Object} evt Map event whose coordinates drive the feature request.
   *  @param {Object} fetchOptions Options to use for fetch calls.
   *
   */
  handleAsyncGetFeatureInfo(layer, promises, evt, fetchOptions) {
    const map = this.map;
    const view = map.getView();
    const map_prj = view.getProjection();
    let url, features_by_layer, layer_name;
    if (layer.metadata && layer.metadata[QUERYABLE_KEY] && isLayerVisible(layer)) {
      const map_resolution = view.getResolution();
      const source = this.sources[layer.source];
      if (source instanceof TileWMSSource) {
        promises.push(new Promise((resolve) => {
          features_by_layer = {};
          layer_name = layer['source-layer'] || layer.id;
          url = this.sources[layer.source].getGetFeatureInfoUrl(
            evt.coordinate, map_resolution, map_prj, {
              INFO_FORMAT: 'application/json',
            },
          );
          fetch(url, fetchOptions).then(
            response => response.json(),
            error => console.error('An error occured.', error),
          )
            .then((json) => {
              features_by_layer[layer_name] = GEOJSON_FORMAT.writeFeaturesObject(
                GEOJSON_FORMAT.readFeatures(json), {
                  featureProjection: GEOJSON_FORMAT.readProjection(json),
                  dataProjection: 'EPSG:4326',
                },
              ).features;
              resolve(features_by_layer);
            }).catch((error) => {
              console.error('An error occured.', error);
            });
        }));
      } else if (layer.metadata[QUERY_ENDPOINT_KEY]) {
        features_by_layer = {};
        const map_size = map.getSize();
        const map_extent = view.calculateExtent(map_size);
        if (layer.metadata[QUERY_TYPE_KEY] === QUERY_TYPE_WFS) {
          const geomName = layer.metadata[GEOMETRY_NAME_KEY];
          promises.push(new Promise((resolve) => {
            const tolerance = ((map_extent[3] - map_extent[1]) / map_size[1]) * this.props.tolerance;
            const coord = evt.coordinate;
            const bbox = [coord[0] - tolerance, coord[1] - tolerance, coord[0] + tolerance, coord[1] + tolerance];
            const params = Object.assign({}, {
              service: 'WFS',
              request: 'GetFeature',
              version: '1.0.0',
              typename: layer.source,
              outputformat: 'JSON',
              srsName: 'EPSG:4326',
              'cql_filter': `BBOX(${geomName},${bbox[0]},${bbox[1]},${bbox[2]},${bbox[3]},'${this.props.projection}')`,
            }, layer.metadata[QUERY_PARAMS_KEY]);
            url = `${layer.metadata[QUERY_ENDPOINT_KEY]}?${encodeQueryObject(params)}`;
            fetch(url, fetchOptions).then(
              response => response.json(),
              error => console.error('An error occured.', error),
            )
              .then((json) => {
                const features = GEOJSON_FORMAT.readFeatures(json);
                const intersection = [];
                for (let i = 0, ii = features.length; i < ii; ++i) {
                  const feature = features[i];
                  const geom = feature.getGeometry();
                  if (geom instanceof PolygonGeom || geom instanceof MultiPolygonGeom) {
                    if (geom.intersectsCoordinate(toLonLat(coord))) {
                      intersection.push(feature);
                    }
                  } else {
                    intersection.push(feature);
                  }
                }
                features_by_layer[layer.source] = GEOJSON_FORMAT.writeFeaturesObject(
                  intersection, {
                    featureProjection: GEOJSON_FORMAT.readProjection(json),
                    dataProjection: 'EPSG:4326',
                  },
                ).features;
                resolve(features_by_layer);
              }).catch((error) => {
                console.error('An error occured.', error);
              });
          }));
        } else {
          promises.push(new Promise((resolve) => {
            const params = {
              geometryType: 'esriGeometryPoint',
              geometry: evt.coordinate.join(','),
              sr: map_prj.getCode().split(':')[1],
              tolerance: 2,
              mapExtent: map_extent.join(','),
              imageDisplay: map_size.join(',') + ',90',
              f: 'json',
              pretty: 'false'
            };
            url = `${layer.metadata[QUERY_ENDPOINT_KEY]}?${encodeQueryObject(params)}`;
            fetchJsonp(url).then(
              response => response.json(),
            ).then((json) => {
              layer_name = layer.id;
              const features = [];
              for (let i = 0, ii = json.results.length; i < ii; ++i) {
                features.push(ESRIJSON_FORMAT.readFeature(json.results[i]));
              }
              features_by_layer[layer_name] = GEOJSON_FORMAT.writeFeaturesObject(
                features, {
                  featureProjection: map_prj,
                  dataProjection: 'EPSG:4326',
                },
              ).features;
              resolve(features_by_layer);
            }).catch(function(error) {
              console.error('An error occured.', error);
            });
          }));
        }
      }
    }
  }

  /** Should we skip the layer for local query (forEachFeatureAtPixel)?
   *
   *  @param {Object} olLayer The openlayers layer object.
   *
   *  @returns {boolean} True if layer should be skipped in the local query.
   */
  shouldSkipForQuery(olLayer) {
    const mapboxLayers = olLayer.get('mapbox-layers');
    if (mapboxLayers) {
      for (let i = 0, ii = mapboxLayers.length; i < ii; ++i) {
        const layer = getLayerById(this.props.map.layers, mapboxLayers[i]);
        if (layer && layer.metadata && (layer.metadata[QUERYABLE_KEY] === false || layer.metadata[QUERY_TYPE_KEY] === QUERY_TYPE_WFS)) {
          return true;
        }
      }
    }
    return false;
  }

  /** Query the map and the appropriate layers.
   *
   *  @param {Object} evt The click event that kicked off the query.
   *
   *  @returns {Promise} Promise.all promise.
   */
  queryMap(evt) {
    // get the map projection
    const map_prj = this.map.getView().getProjection();
    // this is the standard "get features when clicking"
    //  business.
    const features_promise = new Promise((resolve) => {
      const features_by_layer = {};

      this.map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
        // get the gl-name for the layer from the openlayer's layer.
        const layer_name = layer.get('name');
        // use that name as the key for the features-by-layer object,
        // and initialize the array if the layer hasn't been used.
        if (features_by_layer[layer_name] === undefined) {
          features_by_layer[layer_name] = [];
        }
        // if the feature comes from a vector tiled source then
        //  it does not have a complete geometry to serialize and the
        //  geojson parser will fail.
        if (feature instanceof RenderFeature) {
          features_by_layer[layer_name].push({
            properties: feature.getProperties(),
          });
        } else {
          // ensure the features are in 4326 when sent back to the caller.
          features_by_layer[layer_name].push(GEOJSON_FORMAT.writeFeatureObject(feature, {
            featureProjection: map_prj,
            dataProjection: 'EPSG:4326',
          }));
        }
      }, {layerFilter: (candidate) => {
        return !this.shouldSkipForQuery(candidate);
      }});
      resolve(features_by_layer);
    });

    const promises = [features_promise];

    // add other async queries here.
    for (let i = 0, ii = this.props.map.layers.length; i < ii; ++i) {
      const layer = this.props.map.layers[i];
      this.handleAsyncGetFeatureInfo(layer, promises, evt, this.getFetchOptions(this.props, layer.source));
    }

    return Promise.all(promises);
  }

  /** Initialize the map */
  configureMap() {
    // determine the map's projection.
    const map_proj = this.props.projection;

    // determine the map's rotation.
    let rotation;
    if (this.props.map.bearing !== undefined) {
      rotation = degreesToRadians(this.props.map.bearing);
    }

    // reproject the initial center based on that projection.
    let center;
    if (this.props.map.center !== undefined) {
      center = transform(this.props.map.center, 'EPSG:4326', map_proj);
    } else {
      center = [0, 0];
    }
    let zoom;
    if (this.props.map.zoom !== undefined) {
      zoom = this.props.map.zoom + 1;
    } else {
      zoom = 1;
    }
    // initialize the map.
    const minZoom = getKey(this.props.map.metadata, MIN_ZOOM_KEY);
    const maxZoom = getKey(this.props.map.metadata, MAX_ZOOM_KEY);
    this.map = new OlMap({
      interactions: this.props.interactive ? interactionDefaults() : [],
      controls: [new AttributionControl()],
      target: this.mapdiv,
      logo: false,
      view: new View({
        minZoom: minZoom ? minZoom + 1 : undefined,
        maxZoom: maxZoom ? maxZoom + 1 : undefined,
        center,
        zoom,
        rotation: rotation !== undefined ? -rotation : 0,
        projection: map_proj,
      }),
    });
    if (this.props.hover) {
      this.map.on('pointermove', (evt) => {
        const lngLat = toLonLat(evt.coordinate);
        this.props.setMousePosition({lng: lngLat[0], lat: lngLat[1]}, evt.coordinate);
      });
    }

    // when the map starts, reset all the errors.
    this.map.on('movestart', () => {
      this.props.clearSourceErrors();
    });

    // when the map moves update the location in the state
    this.map.on('moveend', () => {
      const view = this.map.getView();
      const projection = view.getProjection();

      this.props.setView({
        center: transform(view.getCenter(), projection, 'EPSG:4326'),
        zoom: view.getZoom() - 1,
        bearing: -(radiansToDegrees(view.getRotation())),
        extent: getMapExtent(view, this.map.getSize()),
        resolution: view.getResolution(),
      });
    });

    this.props.setSize(this.map);

    this.props.setProjection(map_proj);

    this.map.on('change:size', () => {
      this.props.setSize(this.map);
    });

    // when the map is clicked, handle the event.
    this.map.on('singleclick', (evt) => {
      if (this.activeInteractions !== null) {
        return;
      }
      // React listens to events on the document, OpenLayers places their
      // event listeners on the element themselves. The only element
      // the map should care to listen to is the actual rendered map
      // content. This work-around allows the popups and React-based
      // controls to be placed on the ol-overlaycontainer instead of
      // ol-overlaycontainer-stop-event

      // eslint-disable-next-line no-underscore-dangle
      if (this.map.getRenderer().canvas_ === evt.originalEvent.target) {
        const map_prj = this.map.getView().getProjection();

        // if includeFeaturesOnClick is true then query for the
        //  features on the map.
        let features_promises = null;
        if (this.props.includeFeaturesOnClick) {
          features_promises = this.queryMap(evt);
        }

        // ensure the coordinate is also in 4326
        const pt = transform(evt.coordinate, map_prj, 'EPSG:4326');
        const coordinate = {
          0: pt[0],
          1: pt[1],
          xy: evt.coordinate,
          hms: toStringHDMS(pt),
        };

        // send the clicked-on coordinate and the list of features
        this.props.onClick(this, coordinate, features_promises);
      }
    });


    // bootstrap the map with the current configuration.
    if (this.props.map.layers.length > 0) {
      this.configureSources(this.props.map.sources, this.props.map.metadata[SOURCE_VERSION_KEY])
        .then(() => {
          this.configureLayers(this.props.map.sources, this.props.map.layers,
            this.props.map.metadata[LAYER_VERSION_KEY], this.props.map.sprite, this.props.declutter);
        }).catch((error) => {
          console.error('An error occured.', error);
        });
    }

    // this is done after the map composes itself for the first time.
    //  otherwise the map was not always ready for the initial popups.
    this.map.once('postcompose', () => {
      // add the initial popups from the user.
      for (let i = 0, ii = this.props.initialPopups.length; i < ii; i++) {
        // set silent to true since updatePopups is called after the loop
        this.addPopup(this.props.initialPopups[i], true, this.props.stopEvent);
      }

      this.updatePopups();
    });


    // check for any interactions
    if (this.props.drawing && this.props.drawing.interaction) {
      this.updateInteraction(this.props.drawing);
    }
  }

  /** Updates drawing interations.
   *   @param {Object} drawingProps props.drawing.
   */
  updateInteraction(drawingProps) {
    // this assumes the interaction is different,
    //  so the first thing to do is clear out the old interaction
    if (this.activeInteractions !== null) {
      for (let i = 0, ii = this.activeInteractions.length; i < ii; i++) {
        this.map.removeInteraction(this.activeInteractions[i]);
      }
      this.activeInteractions = null;
    }

    if (drawingProps.interaction === INTERACTIONS.modify) {
      let drawObj = {
        wrapX: false,
      };
      drawObj = this.setStyleFunc(drawObj, drawingProps.modifyStyle);
      const select = new SelectInteraction(drawObj);
      if (drawingProps.feature) {
        const readFeatureOpt = {featureProjection: this.map.getView().getProjection()};
        const feature = GEOJSON_FORMAT.readFeature(drawingProps.feature, readFeatureOpt);
        select.getFeatures().push(feature);
        select.setActive(false);
      }
      let modifyObj = {
        features: select.getFeatures(),
      };
      modifyObj = this.setStyleFunc(modifyObj, drawingProps.modifyStyle);

      const modify = new ModifyInteraction(modifyObj);

      modify.on('modifyend', (evt) => {
        this.onFeatureEvent('modified', drawingProps.sourceName, [evt.features.item(0)]);
      });

      this.activeInteractions = [select, modify];
    } else if (drawingProps.interaction === INTERACTIONS.select) {
      // TODO: Select is typically a single-feature affair but there
      //       should be support for multiple feature selections in the future.
      this.getStyleFuncWithSprite(drawingProps.selectStyle).then(styleFunc => {
        const drawObj = {
          wrapX: false,
          layers: (layer) => {
            const layer_src = this.sources[drawingProps.sourceName];
            return (layer.getSource() === layer_src);
          },
        };
        if (styleFunc) {
          drawObj.style = styleFunc;
        }
        const select = new SelectInteraction(drawObj);
        select.on('select', (evt) => {
          if (evt.selected.length > 0) {
            this.onFeatureEvent('selected', drawingProps.sourceName, evt.selected);
          }
          if (evt.deselected.length > 0) {
            this.onFeatureEvent('deselected', drawingProps.sourceName, evt.deselected);
          }
        });
        this.activeInteractions = [select];
        this.addInteractions();
      }).catch((error) => {
        console.error('An error occured.', error);
      });
    } else if (INTERACTIONS.drawing.includes(drawingProps.interaction)) {
      let drawObj = {};
      if (drawingProps.interaction === INTERACTIONS.box) {
        const geometryFunction = createBox();
        drawObj = {
          type: 'Circle',
          geometryFunction
        };
      } else {
        drawObj = {type: drawingProps.interaction};
      }
      const styleDrawObj = this.setStyleFunc(drawObj, drawingProps.editStyle);
      const draw = new DrawInteraction(styleDrawObj);

      draw.on('drawend', (evt) => {
        this.onFeatureEvent('drawn', drawingProps.sourceName, [evt.feature], drawingProps.interaction);
      });

      this.activeInteractions = [draw];
    } else if (INTERACTIONS.measuring.includes(drawingProps.interaction)) {
      // clear the previous measure feature.
      this.props.clearMeasureFeature();

      const measureObj = {
        // The measure interactions are the same as the drawing interactions
        // but are prefixed with "measure:"
        type: drawingProps.interaction.split(':')[1],
      };
      const styleMeasureObj = this.setStyleFunc(measureObj, drawingProps.measureStyle);

      const measure = new DrawInteraction(styleMeasureObj);

      let measure_listener = null;
      measure.on('drawstart', (evt) => {
        const geom = evt.feature.getGeometry();
        const proj = this.map.getView().getProjection();

        measure_listener = geom.on('change', (geomEvt) => {
          this.props.setMeasureGeometry(geomEvt.target, proj);
        });

        this.props.setMeasureGeometry(geom, proj);
      });

      measure.on('drawend', () => {
        // remove the listener
        unByKey(measure_listener);
        this.props.finalizeMeasureFeature();
      });

      this.activeInteractions = [measure];
    }
    this.addInteractions();
  }
  addInteractions() {
    if (this.activeInteractions) {
      for (let i = 0, ii = this.activeInteractions.length; i < ii; i++) {
        this.map.addInteraction(this.activeInteractions[i]);
      }
    }
  }
  finishMeasureGeometry() {
    if (this.activeInteractions && this.activeInteractions.length === 1) {
      this.activeInteractions[0].finishDrawing();
    }
  }
  setStyleFunc(styleObj, style) {
    if (style) {
      styleObj.style = getOLStyleFunctionFromMapboxStyle(style);
    }
    return styleObj;
  }
  getStyleFuncWithSprite(style) {
    if (style) {
      return getOLStyleFunctionFromMapboxStyleWithSprite(style, this.props.map.sprite);
    }
    return new Promise((resolve) => resolve(null));
  }
}

Map.propTypes = {
  ...MapCommon.propTypes,
  /** Options to use for fetch calls */
  fetchOptions: PropTypes.object,
  /** Should we declutter labels and symbols? */
  declutter: PropTypes.bool,
  /** Tolerance in pixels for WFS BBOX type queries */
  tolerance: PropTypes.number,
  /** onFeatureSelected callback, triggered on select event of the select interaction. */
  onFeatureSelected: PropTypes.func,
  /** onFeatureDeselected callback, triggered when a feature gets deselected. */
  onFeatureDeselected: PropTypes.func,
  /** onExportImage callback, done on postcompose. */
  onExportImage: PropTypes.func,
  /** finalizeMeasureFeature callback, called when the measure feature is done.
   * @ignore
   */
  finalizeMeasureFeature: PropTypes.func,
  /** Callback function that should generate a TIME based filter. */
  createLayerFilter: PropTypes.func,
  /**
   * Should we stop events in the popup overlay?
   */
  stopEvent: PropTypes.bool,
};

Map.defaultProps = {
  ...MapCommon.defaultProps,
  stopEvent: false,
  fetchOptions: {
    credentials: 'same-origin',
  },
  tolerance: 4,
  declutter: false,
  onFeatureSelected: () => {
  },
  onFeatureDeselected: () => {
  },
  onExportImage: () => {
  },
  finalizeMeasureFeature: () => {
  },
  createLayerFilter: () => {
  },
  clearSourceErrors: () => {
  },
  setSourceError: () => {
  },
};

function mapStateToProps(state) {
  return {
    map: state.map,
    drawing: state.drawing,
    print: state.print,
    mapbox: state.mapbox,
    size: state.mapinfo ? state.mapinfo.size : null,
    loading: state.mapinfo ? state.mapinfo.loading : false,
    requestedRedraws: state.mapinfo ? state.mapinfo.requestedRedraws : 0,
    sourceRedraws: state.mapinfo ? state.mapinfo.sourceRedraws : {},
  };
}

export function getMapExtent(view, size) {
  const projection = view.getProjection();
  const targetProj = 'EPSG:4326';
  const view_extent = view.calculateExtent(size);
  return transformExtent(view_extent, projection, targetProj);
}

function mapDispatchToProps(dispatch) {
  return {
    updateLayer: (layerId, layerConfig) => {
      dispatch(updateLayer(layerId, layerConfig));
    },
    setView: (view) => {
      dispatch(setView(view.center, view.zoom));
      dispatch(setBearing(view.bearing));
      dispatch(setMapExtent(view.extent));
      dispatch(setResolution(view.resolution));
    },
    setSize: (map) => {
      const size = map.getSize();
      const view = map.getView();
      dispatch(setMapExtent(getMapExtent(view, size)));
      dispatch(setMapSize(size));
    },
    setProjection: (projection) => {
      dispatch(setProjection(projection));
    },
    setMeasureGeometry: (geometry, projection) => {
      const geom = GEOJSON_FORMAT.writeGeometryObject(geometry, {
        featureProjection: projection,
        dataProjection: 'EPSG:4326',
      });
      const segments = [];
      if (geom.type === 'LineString') {
        for (let i = 0, ii = geom.coordinates.length - 1; i < ii; i++) {
          const a = geom.coordinates[i];
          const b = geom.coordinates[i + 1];
          segments.push(getDistance(a, b));
        }
      } else if (geom.type === 'Polygon' && geom.coordinates.length > 0) {
        segments.push(getArea(geometry, {projection}));
      }


      dispatch(setMeasureFeature({
        type: 'Feature',
        properties: {},
        geometry: geom,
      }, segments));
    },
    finalizeMeasureFeature: () => {
      dispatch(finalizeMeasureFeature());
    },
    clearMeasureFeature: () => {
      dispatch(clearMeasureFeature());
    },
    setMousePosition(lngLat, coordinate) {
      dispatch(setMousePosition(lngLat, coordinate));
    },
    setSourceError(srcName) {
      dispatch(setSourceError(srcName));
    },
    clearSourceErrors() {
      dispatch(clearSourceErrors());
    },
    setMapLoading() {
      dispatch(setMapLoading());
    },
    setMapLoaded() {
      dispatch(setMapLoaded());
    },
  };
}

async function getOLStyleFunctionFromMapboxStyleWithSprite(styles, sprite) {
  const {olLayer, glStyle, sources} = prepareLayersAndSources(styles);
  glStyle.sprite = sprite;
  await applyStyle(olLayer, glStyle, sources).catch((error) => {
    console.error('An error occured.', error);
  });
  return olLayer.getStyle();
}

function prepareLayersAndSources(styles) {
  const sources = {};
  for (let i = 0, ii = styles.length; i < ii; ++i) {
    const style = styles[i];
    const id = style.id;
    style.source = id;
    sources[id] = {
      type: 'geojson',
    };
  }
  const glStyle = {
    version: 8,
    layers: styles,
    sources,
  };
  const olLayer = new VectorLayer();

  return {
    olLayer,
    glStyle,
    sources: styles.map(function(style) {
      return style.id;
    })
  };
}

export function getOLStyleFunctionFromMapboxStyle(styles) {
  const {olLayer, glStyle, sources} = prepareLayersAndSources(styles);
  return mb2olstyle(olLayer, glStyle, sources);
}

// Ensure that withRef is set to true so getWrappedInstance will return the Map.
export default connect(mapStateToProps, mapDispatchToProps, undefined, {withRef: true})(Map);
