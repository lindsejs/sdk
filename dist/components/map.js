'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Map = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
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

var getOLStyleFunctionFromMapboxStyleWithSprite = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(styles, sprite) {
    var _prepareLayersAndSour, olLayer, glStyle, sources;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _prepareLayersAndSour = prepareLayersAndSources(styles), olLayer = _prepareLayersAndSour.olLayer, glStyle = _prepareLayersAndSour.glStyle, sources = _prepareLayersAndSour.sources;

            glStyle.sprite = sprite;
            _context.next = 4;
            return (0, _olMapboxStyle.applyStyle)(olLayer, glStyle, sources).catch(function (error) {
              console.error('An error occured.', error);
            });

          case 4:
            return _context.abrupt('return', olLayer.getStyle());

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getOLStyleFunctionFromMapboxStyleWithSprite(_x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.getTileJSONUrl = getTileJSONUrl;
exports.hydrateLayer = hydrateLayer;
exports.getFakeStyle = getFakeStyle;
exports.getMapExtent = getMapExtent;
exports.getOLStyleFunctionFromMapboxStyle = getOLStyleFunctionFromMapboxStyle;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _mapboxGlStyleSpec = require('@mapbox/mapbox-gl-style-spec');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _olMapboxStyle = require('ol-mapbox-style');

var _Map = require('ol/Map');

var _Map2 = _interopRequireDefault(_Map);

var _View = require('ol/View');

var _View2 = _interopRequireDefault(_View);

var _Overlay = require('ol/Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _interaction = require('ol/interaction');

var _Polygon = require('ol/geom/Polygon');

var _Polygon2 = _interopRequireDefault(_Polygon);

var _MultiPolygon = require('ol/geom/MultiPolygon');

var _MultiPolygon2 = _interopRequireDefault(_MultiPolygon);

var _Observable = require('ol/Observable');

var _proj = require('ol/proj');

var _coordinate = require('ol/coordinate');

var _sphere = require('ol/sphere');

var _Tile = require('ol/layer/Tile');

var _Tile2 = _interopRequireDefault(_Tile);

var _XYZ = require('ol/source/XYZ');

var _XYZ2 = _interopRequireDefault(_XYZ);

var _TileWMS = require('ol/source/TileWMS');

var _TileWMS2 = _interopRequireDefault(_TileWMS);

var _TileJSON = require('ol/source/TileJSON');

var _TileJSON2 = _interopRequireDefault(_TileJSON);

var _tilegrid = require('ol/tilegrid');

var _VectorTile = require('ol/layer/VectorTile');

var _VectorTile2 = _interopRequireDefault(_VectorTile);

var _VectorTile3 = require('ol/source/VectorTile');

var _VectorTile4 = _interopRequireDefault(_VectorTile3);

var _MVT = require('ol/format/MVT');

var _MVT2 = _interopRequireDefault(_MVT);

var _Feature = require('ol/render/Feature');

var _Feature2 = _interopRequireDefault(_Feature);

var _Image = require('ol/layer/Image');

var _Image2 = _interopRequireDefault(_Image);

var _ImageStatic = require('ol/source/ImageStatic');

var _ImageStatic2 = _interopRequireDefault(_ImageStatic);

var _Vector = require('ol/layer/Vector');

var _Vector2 = _interopRequireDefault(_Vector);

var _Vector3 = require('ol/source/Vector');

var _Vector4 = _interopRequireDefault(_Vector3);

var _GeoJSON = require('ol/format/GeoJSON');

var _GeoJSON2 = _interopRequireDefault(_GeoJSON);

var _EsriJSON = require('ol/format/EsriJSON');

var _EsriJSON2 = _interopRequireDefault(_EsriJSON);

var _Draw = require('ol/interaction/Draw');

var _Draw2 = _interopRequireDefault(_Draw);

var _Modify = require('ol/interaction/Modify');

var _Modify2 = _interopRequireDefault(_Modify);

var _Select = require('ol/interaction/Select');

var _Select2 = _interopRequireDefault(_Select);

var _stylefunction = require('ol-mapbox-style/stylefunction');

var _stylefunction2 = _interopRequireDefault(_stylefunction);

var _Style = require('ol/style/Style');

var _Style2 = _interopRequireDefault(_Style);

var _sprite = require('../style/sprite');

var _sprite2 = _interopRequireDefault(_sprite);

var _Attribution = require('ol/control/Attribution');

var _Attribution2 = _interopRequireDefault(_Attribution);

var _loadingstrategy = require('ol/loadingstrategy');

var _map = require('../actions/map');

var _mapinfo = require('../actions/mapinfo');

var _constants = require('../constants');

var _map2 = require('../reducers/map');

var _mapCommon = require('./map-common');

var _mapCommon2 = _interopRequireDefault(_mapCommon);

var _drawing = require('../actions/drawing');

var _cluster = require('../source/cluster');

var _cluster2 = _interopRequireDefault(_cluster);

var _util = require('../util');

var _fetchJsonp = require('fetch-jsonp');

var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

require('ol/ol.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module components/map
 *
 * @desc Provide an OpenLayers map which reflects the
 *       state of the Redux store.
 */

var GEOJSON_FORMAT = new _GeoJSON2.default();
var ESRIJSON_FORMAT = new _EsriJSON2.default();
var MAPBOX_PROTOCOL = 'mapbox://';
var MAPBOX_HOST = 'api.mapbox.com/v4';
var BBOX_STRING = '{bbox-epsg-3857}';
var START = 'start';
var END = 'end';

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
  return function (tile, src) {
    (0, _isomorphicFetch2.default)(src, fetchOptions).then(function (r) {
      return r.blob();
    }).then(function (imgData) {
      tile.getImage().src = URL.createObjectURL(imgData);
    }).catch(function () {
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
  return function (tile, url) {
    var loader = function loader() {
      (0, _isomorphicFetch2.default)(url, fetchOptions).then(function (r) {
        return r.arrayBuffer();
      }).then(function (source) {
        var format = tile.getFormat();
        tile.setProjection(format.readProjection(source));
        tile.setFeatures(format.readFeatures(source));
        tile.setExtent(format.getLastExtent());
      }).catch(function (err) {
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
  var tile_url = glSource.tiles[0];
  var commonProps = {
    attributions: glSource.attribution,
    minZoom: glSource.minzoom,
    maxZoom: 'maxzoom' in glSource ? glSource.maxzoom : 22,
    tileSize: glSource.tileSize || 512,
    crossOrigin: 'crossOrigin' in glSource ? glSource.crossOrigin : 'anonymous',
    projection: mapProjection
  };
  // when there is an authorization header, enable the async loader.
  if (fetchOptions.headers && fetchOptions.headers.get('Authorization')) {
    commonProps.tileLoadFunction = authTileLoader(fetchOptions);
  }
  // check to see if the url is a wms request.
  if (tile_url.toUpperCase().indexOf('SERVICE=WMS') >= 0) {
    var params = (0, _util.parseQueryString)(tile_url.substring(tile_url.lastIndexOf('?') + 1));
    var keys = Object.keys(params);
    for (var i = 0, ii = keys.length; i < ii; ++i) {
      if (keys[i].toUpperCase() === 'REQUEST') {
        delete params[keys[i]];
      }
    }
    if (time) {
      params.TIME = time;
    }
    var layerProjection = void 0;
    if (params.CRS !== mapProjection.getCode()) {
      layerProjection = params.CRS;
    }
    return new _TileWMS2.default(Object.assign({
      url: tile_url.split('?')[0],
      params: params
    }, commonProps, { projection: layerProjection }));
  } else {
    var source = new _XYZ2.default(Object.assign({
      urls: glSource.tiles
    }, commonProps));
    source.setTileLoadFunction(function (tile, src) {
      // copy the src string.
      var img_src = src.slice();
      if (src.indexOf(BBOX_STRING) !== -1) {
        var bbox = source.getTileGrid().getTileCoordExtent(tile.getTileCoord());
        img_src = src.replace(BBOX_STRING, bbox.toString());
      }

      // check to see if a cache invalidation has been requested.
      var ck = source.get('_ck');
      if (ck !== undefined) {
        img_src = addParam(img_src, '_ck', ck);
      }

      // disabled the linter below as this is how
      //  OpenLayers documents this operation.
      // eslint-disable-next-line
      tile.getImage().src = img_src;
    });
    if (glSource.scheme === 'tms') {
      source.setTileUrlFunction(function (tileCoord, pixelRatio, projection) {
        var min = 0;
        var max = glSource.tiles.length - 1;
        var idx = Math.floor(Math.random() * (max - min + 1)) + min;
        var z = tileCoord[0];
        var x = tileCoord[1];
        var y = tileCoord[2] + (1 << z);

        var url = glSource.tiles[idx].replace('{z}', z).replace('{y}', y).replace('{x}', x);

        // add cache invalidation as requested.
        var ck = source.get('_ck');
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
function getTileJSONUrl(glSource, accessToken) {
  var url = glSource.url;
  if (url.indexOf(MAPBOX_PROTOCOL) === 0) {
    var mapid = url.replace(MAPBOX_PROTOCOL, '');
    url = 'https://' + MAPBOX_HOST + '/' + mapid + '.json?access_token=' + accessToken;
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
  return new _TileJSON2.default({
    url: getTileJSONUrl(glSource, accessToken),
    crossOrigin: 'anonymous'
  });
}

/** Configures an OpenLayers ImageStaticSource object from the provided
 * Mapbox GL style object.
 * @param {Object} glSource The Mapbox GL map source of type 'image'.
 *
 * @returns {Object} Configured OpenLayers ImageStaticSource.
 */
function configureImageSource(glSource) {
  var coords = glSource.coordinates;
  return new _ImageStatic2.default({
    url: glSource.url,
    imageExtent: [coords[0][0], coords[3][1], coords[1][0], coords[0][1]],
    projection: 'EPSG:4326'
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
    return new Promise(function (resolve, reject) {
      // predefine the source in-case since it's needed for the tile_url_fn
      var source = void 0;
      var tile_url_fn = void 0;
      var tile_load_fn = void 0;
      // check the first tile to see if we need to do BBOX subsitution
      if (glSource.tiles[0].indexOf(BBOX_STRING) !== -1) {
        tile_url_fn = function tile_url_fn(urlTileCoord, pixelRatio, projection) {
          // copy the src string.
          var img_src = glSource.tiles[0].slice();
          // check to see if a cache invalidation has been requested.
          var ck = source.get('_ck');
          if (ck !== undefined) {
            img_src = addParam(img_src, '_ck', ck);
          }
          var bbox = source.getTileGrid().getTileCoordExtent(urlTileCoord);
          return img_src.replace(BBOX_STRING, bbox.toString());
        };
      }
      if (fetchOptions.headers && fetchOptions.headers.get('Authorization')) {
        tile_load_fn = authVectorTileLoader(fetchOptions);
      }
      source = new _VectorTile4.default({
        urls: glSource.tiles,
        tileGrid: (0, _tilegrid.createXYZ)({
          tileSize: 512,
          maxZoom: 'maxzoom' in glSource ? glSource.maxzoom : 22,
          minZoom: glSource.minzoom
        }),
        attributions: glSource.attribution,
        format: new _MVT2.default(),
        crossOrigin: 'crossOrigin' in glSource ? glSource.crossOrigin : 'anonymous',
        tileUrlFunction: tile_url_fn,
        tileLoadFunction: tile_load_fn
      });
      resolve(source);
    });
  } else {
    var url = getTileJSONUrl(glSource, accessToken);
    return (0, _isomorphicFetch2.default)(url, fetchOptions).then(function (response) {
      if (response.ok) {
        return response.json();
      }
    }).then(function (json) {
      return new _VectorTile4.default({
        crossOrigin: 'crossOrigin' in glSource ? glSource.crossOrigin : 'anonymous',
        attributions: json.attribution,
        format: new _MVT2.default(),
        tileGrid: (0, _tilegrid.createXYZ)({
          minZoom: json.minzoom,
          maxZoom: json.maxzoom,
          tileSize: 512
        }),
        urls: json.tiles
      });
    });
  }
}

function addParam(url, paramName, paramValue) {
  var new_url = '' + url;
  if (new_url.indexOf('?') >= 0) {
    new_url += '&';
  } else {
    new_url += '?';
  }
  new_url += paramName + '=' + paramValue;

  return new_url;
}

function getLoaderFunction(glSource, mapProjection, baseUrl, fetchOptions) {
  return function (bbox, resolution, projection) {
    var _this = this;

    // setup a feature promise to handle async loading
    // of features.
    var features_promise = void 0;

    // if the data is a string, assume it's a url
    if (typeof glSource.data === 'string') {
      var url = glSource.data;
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
      var ck = this.get('_ck');
      if (ck !== undefined) {
        url = addParam(url, '_ck', ck);
      }
      features_promise = (0, _isomorphicFetch2.default)(url, fetchOptions).then(function (response) {
        return response.json();
      });
    } else if (_typeof(glSource.data) === 'object' && (glSource.data.type === 'Feature' || glSource.data.type === 'FeatureCollection')) {
      features_promise = new Promise(function (resolve) {
        resolve(glSource.data);
      });
    }

    // if data is undefined then no promise would
    // have been created.
    if (features_promise) {
      // when the feature promise resolves,
      // add those features to the source.
      features_promise.then(function (features) {
        // features could be null, in which case there
        //  are no features to add.
        if (features) {
          // setup the projection options.
          var readFeatureOpt = { featureProjection: mapProjection };

          // bulk load the feature data
          _this.addFeatures(GEOJSON_FORMAT.readFeatures(features, readFeatureOpt));
        }
      }).catch(function (error) {
        // use the event name tileloaderror for consistency.
        _this.dispatchEvent('tileloaderror');
        console.error(error);
      });
    }
  };
}

function updateGeojsonSource(olSource, glSource, mapView, baseUrl, fetchOptions) {
  var src = olSource;
  if (glSource.cluster) {
    src = olSource.getSource();
  }

  // update the loader function based on the glSource definition
  src.loader_ = getLoaderFunction(glSource, mapView.getProjection(), baseUrl, fetchOptions);

  var numFeatures = src.getFeatures().length;

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
  var use_bbox = typeof glSource.data === 'string' && glSource.data.indexOf(BBOX_STRING) >= 0;
  var vector_src = new _Vector4.default({
    strategy: use_bbox ? _loadingstrategy.bbox : _loadingstrategy.all,
    loader: getLoaderFunction(glSource, mapView.getProjection(), baseUrl, fetchOptions),
    useSpatialIndex: true,
    wrapX: wrapX
  });

  // GeoJson sources can be clustered but OpenLayers
  // uses a special source type for that. This handles the
  // "switch" of source-class.
  var new_src = vector_src;
  if (glSource.cluster) {
    new_src = new _cluster2.default({
      source: vector_src,
      // default the distance to 50 as that's what
      //  is specified by Mapbox.
      distance: glSource.clusterRadius ? glSource.clusterRadius : 50
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
  var src = void 0;
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
  return new Promise(function (resolve, reject) {
    resolve(src);
  });
}

/** Create a unique key for a group of layers
 * @param {Object[]} layer_group An array of Mapbox GL layers.
 *
 * @returns {string} The layer_group source name, followed by a concatenated string of layer ids.
 */
function getLayerGroupName(layer_group) {
  var all_names = [];
  for (var i = 0, ii = layer_group.length; i < ii; i++) {
    all_names.push(layer_group[i].id);
  }
  return layer_group[0].source + '-' + all_names.join(',');
}

/** Get the source name from the layer group name.
 * @param {string} groupName The layer group name.
 *
 * @returns {string} The source name for the provided layer group name.
 */
function getSourceName(groupName) {
  var dash = groupName.indexOf('-');
  return groupName.substring(0, dash);
}

/** Populate a ref'd layer.
 * @param {Object[]} layersDef All layers defined in the Mapbox GL stylesheet.
 * @param {Object} glLayer Subset of layers to be rendered as a group.
 *
 * @returns {Object} A new glLayer object with ref'd layer properties mixed in.
 */
function hydrateLayer(layersDef, glLayer) {
  // Small sanity check for when this
  // is blindly called on any layer.
  if (glLayer === undefined || glLayer.ref === undefined) {
    return glLayer;
  }

  var ref_layer = (0, _util.getLayerById)(layersDef, glLayer.ref);

  // default the layer definition to return to
  // the layer itself, incase we can't find the ref layer.
  var layer_def = glLayer;

  // ensure the ref layer is SOMETHING.
  if (ref_layer) {
    // clone the gl layer
    layer_def = (0, _util.jsonClone)(glLayer);
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
  var hydrated_group = [];
  for (var i = 0, ii = layerGroup.length; i < ii; i++) {
    // hydrateLayer checks for "ref"
    hydrated_group.push(hydrateLayer(layersDef, layerGroup[i]));
  }
  return hydrated_group;
}

function getFakeStyle(sprite, layers, sources, baseUrl, accessToken) {
  var fake_style = {
    version: 8,
    sprite: sprite,
    layers: layers,
    sources: sources
  };
  if (sprite && sprite.indexOf(MAPBOX_PROTOCOL) === 0) {
    fake_style.sprite = baseUrl + '/sprite?access_token=' + accessToken;
  }
  return fake_style;
}

var Map = exports.Map = function (_React$Component) {
  _inherits(Map, _React$Component);

  function Map(props) {
    _classCallCheck(this, Map);

    var _this2 = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this, props));

    _this2.loadCounter = 0;

    _this2.sourcesVersion = null;
    _this2.layersVersion = null;

    // keep a version of the sources in
    //  their OpenLayers source definition.
    _this2.sources = {};

    // hash of the openlayers layers in the map.
    _this2.layers = {};

    // popups and their elements are stored as an ID managed hash.
    _this2.popups = {};
    _this2.elems = {};

    // interactions are how the user can manipulate the map,
    //  this tracks any active interaction.
    _this2.activeInteractions = null;

    _this2.render = _mapCommon.MapRender.bind(_this2);
    return _this2;
  }

  _createClass(Map, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // put the map into the DOM
      this.configureMap();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.map) {
        this.map.setTarget(null);
      }
    }

    /** This will check prevProps versus this.props to see what needs to be updated on the map.
     * @param {Object} prevProps The next properties of this component.
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      var old_time = (0, _util.getKey)(prevProps.map.metadata, _constants.TIME_KEY);

      var new_time = (0, _util.getKey)(this.props.map.metadata, _constants.TIME_KEY);

      var force_redraw = this.props.requestedRedraws !== prevProps.requestedRedraws;
      var force_source_redraw = !(0, _util.jsonEquals)(this.props.sourceRedraws, prevProps.sourceRedraws);
      if (old_time !== new_time) {
        // find time dependent layers
        for (var i = 0, ii = this.props.map.layers.length; i < ii; ++i) {
          var layer = this.props.map.layers[i];
          if (layer.metadata[_constants.TIME_START_KEY] !== undefined) {
            this.props.updateLayer(layer.id, {
              filter: this.props.createLayerFilter(layer, this.props.map.metadata[_constants.TIME_KEY])
            });
          }
          if (layer.metadata[_constants.TIME_KEY] !== undefined) {
            var source = layer.source;
            var olSource = this.sources[source];
            if (olSource && olSource instanceof _TileWMS2.default) {
              olSource.updateParams({ TIME: this.props.map.metadata[_constants.TIME_KEY] });
            }
          }
        }
      }

      // Force WMS-type layers to refresh.
      if (force_redraw || force_source_redraw) {
        var timestamp = void 0;
        if (force_redraw) {
          timestamp = new Date().getTime();
        }
        for (var key in this.sources) {
          var src = this.sources[key];
          if (force_source_redraw) {
            timestamp = this.props.sourceRedraws[key];
          }
          if (timestamp) {
            if (typeof src.updateParams === 'function') {
              src.updateParams({ '_CK': timestamp });
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

      var map_view = this.map.getView();
      var map_proj = map_view.getProjection();

      // compare the centers
      if (this.props.map.center !== undefined) {
        // center has not been set yet or differs
        if (prevProps.map.center === undefined || prevProps.map.center[0] !== this.props.map.center[0] || prevProps.map.center[1] !== this.props.map.center[1]) {
          // convert the center point to map coordinates.
          var center = (0, _proj.transform)(this.props.map.center, 'EPSG:4326', map_proj);
          map_view.setCenter(center);
        }
      }
      // compare the zoom
      if (this.props.map.zoom !== undefined && this.props.map.zoom !== prevProps.map.zoom) {
        map_view.setZoom(this.props.map.zoom + 1);
      }
      // compare the rotation
      if (this.props.map.bearing !== undefined && this.props.map.bearing !== prevProps.map.bearing) {
        var rotation = (0, _util.degreesToRadians)(this.props.map.bearing);
        map_view.setRotation(-rotation);
      }

      // check the sources diff
      var next_sources_version = getVersion(this.props.map, _constants.SOURCE_VERSION_KEY);
      var next_layer_version = getVersion(this.props.map, _constants.LAYER_VERSION_KEY);

      // default to the source-configuration promise to being resolved.
      var sources_promise = new Promise(function (resolve, reject) {
        resolve(true);
      });

      if (this.sourcesVersion !== next_sources_version || force_redraw) {
        sources_promise = this.configureSources(this.props.map.sources, next_sources_version, prevProps).then(function () {
          _this3.configureLayers(_this3.props.map.sources, _this3.props.map.layers, next_layer_version, _this3.props.map.sprite, _this3.props.declutter, prevProps);
        }).catch(function (error) {
          console.error('An error occured.', error);
        });
      } else if (this.layersVersion !== next_layer_version) {
        this.configureLayers(this.props.map.sources, this.props.map.layers, next_layer_version, this.props.map.sprite, this.props.declutter, prevProps);
      }

      // wait for the sources to be ready.
      var props = prevProps;
      sources_promise.then(function () {
        // check the vector sources for data changes
        var src_names = Object.keys(_this3.props.map.sources);
        for (var _i = 0, _ii = src_names.length; _i < _ii; _i++) {
          var src_name = src_names[_i];
          var _src = props.map.sources[src_name];
          if (_src && _src.type === 'geojson') {
            var version_key = (0, _map2.dataVersionKey)(src_name);

            if (force_redraw || props.map.metadata !== undefined && props.map.metadata[version_key] !== _this3.props.map.metadata[version_key]) {
              var next_src = _this3.props.map.sources[src_name];
              updateGeojsonSource(_this3.sources[src_name], next_src, map_view, props.mapbox.baseUrl, _this3.getFetchOptions(props, src_name));
            }
          }
        }
      }).catch(function (error) {
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
        this.map.once('postcompose', function (evt) {
          try {
            evt.context.canvas.toBlob(_this3.props.onExportImage);
          } catch (err) {
            console.error('Failed To Export Map as Image', err);
          }
        }, this);
        this.map.renderSync();
      }

      if (force_redraw || !(0, _util.jsonEquals)(this.props.size, prevProps.size)) {
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

  }, {
    key: 'onFeatureEvent',
    value: function onFeatureEvent(eventType, sourceName, features, interaction) {
      // convert the features to GeoJson
      var proposed_geojson = GEOJSON_FORMAT.writeFeaturesObject(features, {
        dataProjection: 'EPSG:4326',
        featureProjection: this.map.getView().getProjection()
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
  }, {
    key: 'onLoadEvents',
    value: function onLoadEvents(eventType) {
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
  }, {
    key: 'getFetchOptions',
    value: function getFetchOptions(props, src_name) {
      var fetchOptions = props.fetchOptions;
      if (props.map.metadata[_constants.SOURCES_FETCH_OPTIONS_KEY] && props.map.metadata[_constants.SOURCES_FETCH_OPTIONS_KEY][src_name]) {
        fetchOptions = Object.assign({}, props.map.metadata[_constants.SOURCES_FETCH_OPTIONS_KEY][src_name]);
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

  }, {
    key: 'configureSources',
    value: function configureSources(sourcesDef, sourceVersion, prevProps) {
      var _this4 = this;

      var promises = [];
      // TODO: Update this to check "diff" configurations
      //       of sources.  Currently, this will only detect
      //       additions and removals.
      var src_names = Object.keys(sourcesDef);
      var map_view = this.map.getView();

      var sourceError = this.props.setSourceError;
      var listenForError = function listenForError(src_name, source) {
        source.on('tileloaderror', function () {
          sourceError(src_name);
        });
      };

      var listenForLoad = function listenForLoad(source) {
        source.on('tileloadstart', function () {
          _this4.onLoadEvents(START);
        });
        source.on('tileloadend', function () {
          _this4.onLoadEvents(END);
        });
        source.on('tileloaderror', function () {
          _this4.onLoadEvents(END);
        });
      };

      var addSource = function addSource(src_name, source) {
        if (source) {
          this.sources[src_name] = source;
          listenForError(src_name, source);
          listenForLoad(source);
        }
      };
      var addAndUpdateSource = function addAndUpdateSource(src_name, source) {
        if (source) {
          this.sources[src_name] = source;
          this.updateLayerSource(src_name);
          listenForError(src_name, source);
          listenForLoad(source);
        }
      };

      for (var i = 0, ii = src_names.length; i < ii; i++) {
        var src_name = src_names[i];
        // Add the source because it's not in the current
        //  list of sources.
        if (!(src_name in this.sources)) {
          var time = (0, _util.getKey)(this.props.map.metadata, _constants.TIME_KEY);
          promises.push(configureSource(sourcesDef[src_name], map_view, this.props.mapbox.accessToken, this.props.mapbox.baseUrl, time, this.props.wrapX, this.getFetchOptions(this.props, src_name)).then(addSource.bind(this, src_name)));
        }
        var src = prevProps ? prevProps.map.sources[src_name] : this.props.map.sources[src_name];
        if (src && src.type !== 'geojson' && !(0, _util.jsonEquals)(src, sourcesDef[src_name])) {
          // reconfigure source and tell layers about it
          promises.push(configureSource(sourcesDef[src_name], map_view, this.props.mapbox.accessToken, this.props.mapbox.baseUrl, undefined, this.props.wrapX, this.getFetchOptions(this.props, src_name)).then(addAndUpdateSource.bind(this, src_name)));
        }

        // Check to see if there was a clustering change.
        // Because OpenLayers requires a *different* source to handle clustering,
        // this handles update the named source and then subsequently updating
        // the layers.
        if (src && (src.cluster !== sourcesDef[src_name].cluster || src.clusterRadius !== sourcesDef[src_name].clusterRadius)) {
          // reconfigure the source for clustering.
          promises.push(configureSource(sourcesDef[src_name], map_view, this.props.mapbox.accessToken, this.props.mapbox.baseUrl, undefined, this.props.wrapX, this.getFetchOptions(this.props, src_name)).then(addAndUpdateSource.bind(this, src_name)));
        }
      }

      // remove sources no longer there.
      src_names = Object.keys(this.sources);
      for (var _i2 = 0, _ii2 = src_names.length; _i2 < _ii2; _i2++) {
        var _src_name = src_names[_i2];
        if (!(_src_name in sourcesDef)) {
          // TODO: Remove all layers that are using this source.
          delete this.sources[_src_name];
        }
      }
      return Promise.all(promises).then(function () {
        _this4.sourcesVersion = sourceVersion;
      });
    }

    /** Applies the sprite animation information to the layer
     *  @param {Object} olLayer OpenLayers layer object.
     *  @param {Object[]} layers Array of Mapbox GL layer objects.
     */

  }, {
    key: 'applySpriteAnimation',
    value: function applySpriteAnimation(olLayer, layers) {
      var _this5 = this;

      this.map.on('postcompose', function (e) {
        _this5.map.render(); // animate
      });
      var styleCache = {};
      var spriteOptions = {};
      for (var i = 0, ii = layers.length; i < ii; ++i) {
        var layer = layers[i];
        spriteOptions[layer.id] = (0, _util.jsonClone)(layer.metadata['bnd:animate-sprite']);
        if (Array.isArray(layer.filter)) {
          layer.filter = (0, _mapboxGlStyleSpec.featureFilter)(layer.filter);
        }
      }
      olLayer.setStyle(function (feature, resolution) {
        // loop over the layers to see which one matches
        for (var l = 0, ll = layers.length; l < ll; ++l) {
          var _layer = layers[l];
          if (!_layer.filter || _layer.filter(undefined, { properties: feature.getProperties() })) {
            if (!spriteOptions[_layer.id].rotation || spriteOptions[_layer.id].rotation && !spriteOptions[_layer.id].rotation.property) {
              if (!styleCache[_layer.id]) {
                (function () {
                  var sprite = new _sprite2.default(spriteOptions[_layer.id]);
                  styleCache[_layer.id] = new _Style2.default({ image: sprite });
                  _this5.map.on('postcompose', function (e) {
                    sprite.update(e);
                  });
                })();
              }
              return styleCache[_layer.id];
            } else {
              if (!styleCache[_layer.id]) {
                styleCache[_layer.id] = {};
              }
              var rotationAttribute = spriteOptions[_layer.id].rotation.property;
              var rotation = feature.get(rotationAttribute);
              if (!styleCache[_layer.id][rotation]) {
                (function () {
                  var options = (0, _util.jsonClone)(_layer.metadata['bnd:animate-sprite']);
                  options.rotation = rotation;
                  var sprite = new _sprite2.default(options);
                  var style = new _Style2.default({ image: sprite });
                  _this5.map.on('postcompose', function (e) {
                    sprite.update(e);
                  });
                  styleCache[_layer.id][rotation] = style;
                })();
              }
              return styleCache[_layer.id][rotation];
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

  }, {
    key: 'applyStyle',
    value: function applyStyle(olLayer, layers, sprite, glSource) {
      // filter out the layers which are not visible
      var render_layers = [];
      var spriteLayers = [];
      for (var i = 0, ii = layers.length; i < ii; i++) {
        var layer = layers[i];
        if (layer.metadata && layer.metadata['bnd:animate-sprite']) {
          spriteLayers.push(layer);
        }
        var is_visible = (0, _util.isLayerVisible)(layer);
        if (is_visible) {
          render_layers.push(layer);
        }
      }
      if (spriteLayers.length > 0) {
        this.applySpriteAnimation(olLayer, spriteLayers);
      }
      var sources = {};
      sources[layers[0].source] = glSource;
      var fake_style = getFakeStyle(sprite || this.props.map.sprite, render_layers, sources, this.props.mapbox.baseUrl, this.props.mapbox.accessToken);
      if (olLayer.setStyle && spriteLayers.length === 0) {
        (0, _olMapboxStyle.applyStyle)(olLayer, fake_style, layers[0].source).catch(function (error) {
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

  }, {
    key: 'configureLayer',
    value: function configureLayer(sourceName, glSource, layers, sprite, declutter, idx) {
      var source = this.sources[sourceName];
      var layer = null;
      switch (glSource.type) {
        case 'raster':
          layer = new _Tile2.default({
            source: source,
            zIndex: idx,
            opacity: layers[0].paint ? layers[0].paint['raster-opacity'] : undefined
          });
          this.applyStyle(layer, layers, sprite, glSource);
          return layer;
        case 'geojson':
          layer = new _Vector2.default({
            declutter: declutter,
            zIndex: idx,
            source: source
          });
          this.applyStyle(layer, layers, sprite, glSource);
          return layer;
        case 'vector':
          var time = (0, _util.getKey)(this.props.map.metadata, _constants.TIME_KEY);
          if (time && layers[0].metadata && layers[0].metadata[_constants.TIME_START_KEY] !== undefined) {
            layers[0].filter = this.props.createLayerFilter(layers[0], time);
          }
          var tileGrid = source.getTileGrid();
          layer = new _VectorTile2.default({
            maxResolution: tileGrid.getMinZoom() > 0 ? tileGrid.getResolution(tileGrid.getMinZoom()) : undefined,
            declutter: declutter,
            zIndex: idx,
            source: source
          });
          this.applyStyle(layer, layers, sprite, glSource);
          return layer;
        case 'image':
          return new _Image2.default({
            source: source,
            zIndex: idx,
            opacity: layers[0].paint ? layers[0].paint['raster-opacity'] : undefined
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

  }, {
    key: 'updateLayerSource',
    value: function updateLayerSource(sourceName) {
      var layer_names = Object.keys(this.layers);
      for (var i = 0, ii = layer_names.length; i < ii; i++) {
        var name = layer_names[i];
        if (getSourceName(name) === sourceName) {
          this.layers[name].setSource(this.sources[sourceName]);
        }
      }
    }

    /** Updates the rendered OpenLayers layers
     *  based on the current Redux state.map.layers.
     *  @param {string[]} layerNames An array of layer names.
     */

  }, {
    key: 'cleanupLayers',
    value: function cleanupLayers(layerNames) {
      var layer_exists = {};
      for (var i = 0, ii = layerNames.length; i < ii; i++) {
        layer_exists[layerNames[i]] = true;
      }

      // check for layers which should be removed.
      var layer_ids = Object.keys(this.layers);
      for (var _i3 = 0, _ii3 = layer_ids.length; _i3 < _ii3; _i3++) {
        var layer_id = layer_ids[_i3];
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

  }, {
    key: 'configureLayers',
    value: function configureLayers(sourcesDef, layersDef, layerVersion, sprite, declutter, prevProps) {
      // update the internal version counter.
      this.layersVersion = layerVersion;
      // bin layers into groups based on their source.
      var layer_groups = [];

      var last_source = null;
      var layer_group = [];
      for (var i = 0, ii = layersDef.length; i < ii; i++) {
        var layer = layersDef[i];

        // fake the "layer" by getting the source
        //  from the ref'd layer.
        if (layer.ref !== undefined) {
          layer = {
            source: (0, _util.getLayerById)(layersDef, layer.ref).source
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

      var group_names = [];
      for (var _i4 = 0, _ii4 = layer_groups.length; _i4 < _ii4; _i4++) {
        var lyr_group = layer_groups[_i4];
        var group_name = getLayerGroupName(lyr_group);
        group_names.push(group_name);

        var source_name = hydrateLayer(layersDef, lyr_group[0]).source;
        var source = sourcesDef[source_name];

        // if the layer is not on the map, create it.
        if (!(group_name in this.layers)) {
          if (lyr_group[0].type === 'background') {
            (0, _olMapboxStyle.applyBackground)(this.map, { layers: lyr_group });
          } else {
            var hydrated_group = hydrateLayerGroup(layersDef, lyr_group);
            var new_layer = this.configureLayer(source_name, source, hydrated_group, sprite, declutter, _i4);

            // if the new layer has been defined, add it to the map.
            if (new_layer !== null) {
              new_layer.set('name', group_name);
              this.layers[group_name] = new_layer;
              this.map.addLayer(this.layers[group_name]);
            }
          }
        } else {
          var ol_layer = this.layers[group_name];

          // check for style changes, the OL style
          // is defined by filter and paint elements.
          var current_layers = [];
          for (var j = 0, jj = lyr_group.length; j < jj; j++) {
            current_layers.push((0, _util.getLayerById)(prevProps ? prevProps.map.layers : this.props.map.layers, lyr_group[j].id));
          }
          if (!(0, _util.jsonEquals)(lyr_group, current_layers)) {
            this.applyStyle(ol_layer, hydrateLayerGroup(layersDef, lyr_group), sprite, source);
          }

          // update the min/maxzooms
          var view = this.map.getView();
          if (source.minzoom) {
            ol_layer.setMaxResolution(view.getResolutionForZoom(source.minzoom));
          }
          if (source.maxzoom) {
            ol_layer.setMinResolution(view.getResolutionForZoom(source.maxzoom));
          }

          // update the display order.
          ol_layer.setZIndex(_i4);
        }
      }

      // clean up layers which should be removed.
      this.cleanupLayers(group_names);
    }

    /** Removes popups from the map via OpenLayers removeOverlay().
     */

  }, {
    key: 'updatePopups',
    value: function updatePopups() {
      var _this6 = this;

      var overlays = this.map.getOverlays();
      var overlays_to_remove = [];

      overlays.forEach(function (overlay) {
        var id = overlay.get('popupId');
        if (_this6.popups[id].state.closed !== false) {
          _this6.popups[id].setMap(null);
          // mark this for removal
          overlays_to_remove.push(overlay);
          // umount the component from the DOM
          _reactDom2.default.unmountComponentAtNode(_this6.elems[id]);
          // remove the component from the popups hash
          delete _this6.popups[id];
          delete _this6.elems[id];
        }
      });

      // remove the old/closed overlays from the map.
      for (var i = 0, ii = overlays_to_remove.length; i < ii; i++) {
        this.map.removeOverlay(overlays_to_remove[i]);
      }
    }
  }, {
    key: 'removePopup',
    value: function removePopup(popupId) {
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

  }, {
    key: 'addPopup',
    value: function addPopup(popup) {
      var silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var stopEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      // each popup uses a unique id to relate what is
      //  in openlayers vs what we have in the react world.
      var id = _uuid2.default.v4();

      var elem = document.createElement('div');
      elem.setAttribute('class', 'sdk-popup');
      var overlay = new _Overlay2.default({
        // create an empty div element for the Popup
        element: elem,
        // if false, allow events to pass through, using the default stopevent
        // container does not allow react to check for events.
        stopEvent: stopEvent,
        // put the popup into view
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      });

      // Editor's note:
      // I hate using the self = this construction but
      //  there were few options when needing to get the
      //  instance of the react component using the callback
      //  method recommened by eslint and the react team.
      // See here:
      // - https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md
      var self = this;
      // render the element into the popup's DOM.
      _reactDom2.default.render(popup, elem, function addInstance() {
        self.popups[id] = this;
        self.elems[id] = elem;
        this.setMap(self);
      });

      // set the popup id so we can match the component
      //  to the overlay.
      overlay.set('popupId', id);

      // Add the overlay to the map,
      this.map.addOverlay(overlay);

      // reset the position after the popup has been added to the map.
      // assumes the popups coordinate is 4326
      var wgs84 = [popup.props.coordinate[0], popup.props.coordinate[1]];
      var xy = (0, _proj.transform)(wgs84, 'EPSG:4326', this.map.getView().getProjection());
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

  }, {
    key: 'handleAsyncGetFeatureInfo',
    value: function handleAsyncGetFeatureInfo(layer, promises, evt, fetchOptions) {
      var _this7 = this;

      var map = this.map;
      var view = map.getView();
      var map_prj = view.getProjection();
      var url = void 0,
          features_by_layer = void 0,
          layer_name = void 0;
      if (layer.metadata && layer.metadata[_constants.QUERYABLE_KEY] && (0, _util.isLayerVisible)(layer)) {
        var map_resolution = view.getResolution();
        var source = this.sources[layer.source];
        if (source instanceof _TileWMS2.default) {
          promises.push(new Promise(function (resolve) {
            features_by_layer = {};
            layer_name = layer['source-layer'] || layer.id;
            url = _this7.sources[layer.source].getGetFeatureInfoUrl(evt.coordinate, map_resolution, map_prj, {
              INFO_FORMAT: 'application/json'
            });
            (0, _isomorphicFetch2.default)(url, fetchOptions).then(function (response) {
              return response.json();
            }, function (error) {
              return console.error('An error occured.', error);
            }).then(function (json) {
              features_by_layer[layer_name] = GEOJSON_FORMAT.writeFeaturesObject(GEOJSON_FORMAT.readFeatures(json), {
                featureProjection: GEOJSON_FORMAT.readProjection(json),
                dataProjection: 'EPSG:4326'
              }).features;
              resolve(features_by_layer);
            }).catch(function (error) {
              console.error('An error occured.', error);
            });
          }));
        } else if (layer.metadata[_constants.QUERY_ENDPOINT_KEY]) {
          features_by_layer = {};
          var map_size = map.getSize();
          var map_extent = view.calculateExtent(map_size);
          if (layer.metadata[_constants.QUERY_TYPE_KEY] === _constants.QUERY_TYPE_WFS) {
            var geomName = layer.metadata[_constants.GEOMETRY_NAME_KEY];
            promises.push(new Promise(function (resolve) {
              var tolerance = (map_extent[3] - map_extent[1]) / map_size[1] * _this7.props.tolerance;
              var coord = evt.coordinate;
              var bbox = [coord[0] - tolerance, coord[1] - tolerance, coord[0] + tolerance, coord[1] + tolerance];
              var params = Object.assign({}, {
                service: 'WFS',
                request: 'GetFeature',
                version: '1.0.0',
                typename: layer.source,
                outputformat: 'JSON',
                srsName: 'EPSG:4326',
                'cql_filter': 'BBOX(' + geomName + ',' + bbox[0] + ',' + bbox[1] + ',' + bbox[2] + ',' + bbox[3] + ',\'' + _this7.props.projection + '\')'
              }, layer.metadata[_constants.QUERY_PARAMS_KEY]);
              url = layer.metadata[_constants.QUERY_ENDPOINT_KEY] + '?' + (0, _util.encodeQueryObject)(params);
              (0, _isomorphicFetch2.default)(url, fetchOptions).then(function (response) {
                return response.json();
              }, function (error) {
                return console.error('An error occured.', error);
              }).then(function (json) {
                var features = GEOJSON_FORMAT.readFeatures(json);
                var intersection = [];
                for (var i = 0, ii = features.length; i < ii; ++i) {
                  var feature = features[i];
                  var geom = feature.getGeometry();
                  if (geom instanceof _Polygon2.default || geom instanceof _MultiPolygon2.default) {
                    if (geom.intersectsCoordinate((0, _proj.toLonLat)(coord))) {
                      intersection.push(feature);
                    }
                  } else {
                    intersection.push(feature);
                  }
                }
                features_by_layer[layer.source] = GEOJSON_FORMAT.writeFeaturesObject(intersection, {
                  featureProjection: GEOJSON_FORMAT.readProjection(json),
                  dataProjection: 'EPSG:4326'
                }).features;
                resolve(features_by_layer);
              }).catch(function (error) {
                console.error('An error occured.', error);
              });
            }));
          } else {
            promises.push(new Promise(function (resolve) {
              var params = {
                geometryType: 'esriGeometryPoint',
                geometry: evt.coordinate.join(','),
                sr: map_prj.getCode().split(':')[1],
                tolerance: 2,
                mapExtent: map_extent.join(','),
                imageDisplay: map_size.join(',') + ',90',
                f: 'json',
                pretty: 'false'
              };
              url = layer.metadata[_constants.QUERY_ENDPOINT_KEY] + '?' + (0, _util.encodeQueryObject)(params);
              (0, _fetchJsonp2.default)(url).then(function (response) {
                return response.json();
              }).then(function (json) {
                layer_name = layer.id;
                var features = [];
                for (var i = 0, ii = json.results.length; i < ii; ++i) {
                  features.push(ESRIJSON_FORMAT.readFeature(json.results[i]));
                }
                features_by_layer[layer_name] = GEOJSON_FORMAT.writeFeaturesObject(features, {
                  featureProjection: map_prj,
                  dataProjection: 'EPSG:4326'
                }).features;
                resolve(features_by_layer);
              }).catch(function (error) {
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

  }, {
    key: 'shouldSkipForQuery',
    value: function shouldSkipForQuery(olLayer) {
      var mapboxLayers = olLayer.get('mapbox-layers');
      if (mapboxLayers) {
        for (var i = 0, ii = mapboxLayers.length; i < ii; ++i) {
          var layer = (0, _util.getLayerById)(this.props.map.layers, mapboxLayers[i]);
          if (layer && layer.metadata && (layer.metadata[_constants.QUERYABLE_KEY] === false || layer.metadata[_constants.QUERY_TYPE_KEY] === _constants.QUERY_TYPE_WFS)) {
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

  }, {
    key: 'queryMap',
    value: function queryMap(evt) {
      var _this8 = this;

      // get the map projection
      var map_prj = this.map.getView().getProjection();
      // this is the standard "get features when clicking"
      //  business.
      var features_promise = new Promise(function (resolve) {
        var features_by_layer = {};

        _this8.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
          // get the gl-name for the layer from the openlayer's layer.
          var layer_name = layer.get('name');
          // use that name as the key for the features-by-layer object,
          // and initialize the array if the layer hasn't been used.
          if (features_by_layer[layer_name] === undefined) {
            features_by_layer[layer_name] = [];
          }
          // if the feature comes from a vector tiled source then
          //  it does not have a complete geometry to serialize and the
          //  geojson parser will fail.
          if (feature instanceof _Feature2.default) {
            features_by_layer[layer_name].push({
              properties: feature.getProperties()
            });
          } else {
            // ensure the features are in 4326 when sent back to the caller.
            features_by_layer[layer_name].push(GEOJSON_FORMAT.writeFeatureObject(feature, {
              featureProjection: map_prj,
              dataProjection: 'EPSG:4326'
            }));
          }
        }, { layerFilter: function layerFilter(candidate) {
            return !_this8.shouldSkipForQuery(candidate);
          } });
        resolve(features_by_layer);
      });

      var promises = [features_promise];

      // add other async queries here.
      for (var i = 0, ii = this.props.map.layers.length; i < ii; ++i) {
        var layer = this.props.map.layers[i];
        this.handleAsyncGetFeatureInfo(layer, promises, evt, this.getFetchOptions(this.props, layer.source));
      }

      return Promise.all(promises);
    }

    /** Initialize the map */

  }, {
    key: 'configureMap',
    value: function configureMap() {
      var _this9 = this;

      // determine the map's projection.
      var map_proj = this.props.projection;

      // determine the map's rotation.
      var rotation = void 0;
      if (this.props.map.bearing !== undefined) {
        rotation = (0, _util.degreesToRadians)(this.props.map.bearing);
      }

      // reproject the initial center based on that projection.
      var center = void 0;
      if (this.props.map.center !== undefined) {
        center = (0, _proj.transform)(this.props.map.center, 'EPSG:4326', map_proj);
      } else {
        center = [0, 0];
      }
      var zoom = void 0;
      if (this.props.map.zoom !== undefined) {
        zoom = this.props.map.zoom + 1;
      } else {
        zoom = 1;
      }
      // initialize the map.
      var minZoom = (0, _util.getKey)(this.props.map.metadata, _constants.MIN_ZOOM_KEY);
      var maxZoom = (0, _util.getKey)(this.props.map.metadata, _constants.MAX_ZOOM_KEY);
      this.map = new _Map2.default({
        interactions: this.props.interactive ? (0, _interaction.defaults)() : [],
        controls: [new _Attribution2.default()],
        target: this.mapdiv,
        logo: false,
        view: new _View2.default({
          minZoom: minZoom ? minZoom + 1 : undefined,
          maxZoom: maxZoom ? maxZoom + 1 : undefined,
          center: center,
          zoom: zoom,
          rotation: rotation !== undefined ? -rotation : 0,
          projection: map_proj
        })
      });
      if (this.props.hover) {
        this.map.on('pointermove', function (evt) {
          var lngLat = (0, _proj.toLonLat)(evt.coordinate);
          _this9.props.setMousePosition({ lng: lngLat[0], lat: lngLat[1] }, evt.coordinate);
        });
      }

      // when the map starts, reset all the errors.
      this.map.on('movestart', function () {
        _this9.props.clearSourceErrors();
      });

      // when the map moves update the location in the state
      this.map.on('moveend', function () {
        var view = _this9.map.getView();
        var projection = view.getProjection();

        _this9.props.setView({
          center: (0, _proj.transform)(view.getCenter(), projection, 'EPSG:4326'),
          zoom: view.getZoom() - 1,
          bearing: -(0, _util.radiansToDegrees)(view.getRotation()),
          extent: getMapExtent(view, _this9.map.getSize()),
          resolution: view.getResolution()
        });
      });

      this.props.setSize(this.map);

      this.props.setProjection(map_proj);

      this.map.on('change:size', function () {
        _this9.props.setSize(_this9.map);
      });

      // when the map is clicked, handle the event.
      this.map.on('singleclick', function (evt) {
        if (_this9.activeInteractions !== null) {
          return;
        }
        // React listens to events on the document, OpenLayers places their
        // event listeners on the element themselves. The only element
        // the map should care to listen to is the actual rendered map
        // content. This work-around allows the popups and React-based
        // controls to be placed on the ol-overlaycontainer instead of
        // ol-overlaycontainer-stop-event

        // eslint-disable-next-line no-underscore-dangle
        if (_this9.map.getRenderer().canvas_ === evt.originalEvent.target) {
          var map_prj = _this9.map.getView().getProjection();

          // if includeFeaturesOnClick is true then query for the
          //  features on the map.
          var features_promises = null;
          if (_this9.props.includeFeaturesOnClick) {
            features_promises = _this9.queryMap(evt);
          }

          // ensure the coordinate is also in 4326
          var pt = (0, _proj.transform)(evt.coordinate, map_prj, 'EPSG:4326');
          var coordinate = {
            0: pt[0],
            1: pt[1],
            xy: evt.coordinate,
            hms: (0, _coordinate.toStringHDMS)(pt)
          };

          // send the clicked-on coordinate and the list of features
          _this9.props.onClick(_this9, coordinate, features_promises);
        }
      });

      // bootstrap the map with the current configuration.
      if (this.props.map.layers.length > 0) {
        this.configureSources(this.props.map.sources, this.props.map.metadata[_constants.SOURCE_VERSION_KEY]).then(function () {
          _this9.configureLayers(_this9.props.map.sources, _this9.props.map.layers, _this9.props.map.metadata[_constants.LAYER_VERSION_KEY], _this9.props.map.sprite, _this9.props.declutter);
        }).catch(function (error) {
          console.error('An error occured.', error);
        });
      }

      // this is done after the map composes itself for the first time.
      //  otherwise the map was not always ready for the initial popups.
      this.map.once('postcompose', function () {
        // add the initial popups from the user.
        for (var i = 0, ii = _this9.props.initialPopups.length; i < ii; i++) {
          // set silent to true since updatePopups is called after the loop
          _this9.addPopup(_this9.props.initialPopups[i], true, _this9.props.stopEvent);
        }

        _this9.updatePopups();
      });

      // check for any interactions
      if (this.props.drawing && this.props.drawing.interaction) {
        this.updateInteraction(this.props.drawing);
      }
    }

    /** Updates drawing interations.
     *   @param {Object} drawingProps props.drawing.
     */

  }, {
    key: 'updateInteraction',
    value: function updateInteraction(drawingProps) {
      var _this10 = this;

      // this assumes the interaction is different,
      //  so the first thing to do is clear out the old interaction
      if (this.activeInteractions !== null) {
        for (var i = 0, ii = this.activeInteractions.length; i < ii; i++) {
          this.map.removeInteraction(this.activeInteractions[i]);
        }
        this.activeInteractions = null;
      }

      if (drawingProps.interaction === _constants.INTERACTIONS.modify) {
        var drawObj = {
          wrapX: false
        };
        drawObj = this.setStyleFunc(drawObj, drawingProps.modifyStyle);
        var select = new _Select2.default(drawObj);
        if (drawingProps.feature) {
          var readFeatureOpt = { featureProjection: this.map.getView().getProjection() };
          var feature = GEOJSON_FORMAT.readFeature(drawingProps.feature, readFeatureOpt);
          select.getFeatures().push(feature);
          select.setActive(false);
        }
        var modifyObj = {
          features: select.getFeatures()
        };
        modifyObj = this.setStyleFunc(modifyObj, drawingProps.modifyStyle);

        var modify = new _Modify2.default(modifyObj);

        modify.on('modifyend', function (evt) {
          _this10.onFeatureEvent('modified', drawingProps.sourceName, [evt.features.item(0)]);
        });

        this.activeInteractions = [select, modify];
      } else if (drawingProps.interaction === _constants.INTERACTIONS.select) {
        // TODO: Select is typically a single-feature affair but there
        //       should be support for multiple feature selections in the future.
        this.getStyleFuncWithSprite(drawingProps.selectStyle).then(function (styleFunc) {
          var drawObj = {
            wrapX: false,
            layers: function layers(layer) {
              var layer_src = _this10.sources[drawingProps.sourceName];
              return layer.getSource() === layer_src;
            }
          };
          if (styleFunc) {
            drawObj.style = styleFunc;
          }
          var select = new _Select2.default(drawObj);
          select.on('select', function (evt) {
            if (evt.selected.length > 0) {
              _this10.onFeatureEvent('selected', drawingProps.sourceName, evt.selected);
            }
            if (evt.deselected.length > 0) {
              _this10.onFeatureEvent('deselected', drawingProps.sourceName, evt.deselected);
            }
          });
          _this10.activeInteractions = [select];
          _this10.addInteractions();
        }).catch(function (error) {
          console.error('An error occured.', error);
        });
      } else if (_constants.INTERACTIONS.drawing.includes(drawingProps.interaction)) {
        var _drawObj = {};
        if (drawingProps.interaction === _constants.INTERACTIONS.box) {
          var geometryFunction = (0, _Draw.createBox)();
          _drawObj = {
            type: 'Circle',
            geometryFunction: geometryFunction
          };
        } else {
          _drawObj = { type: drawingProps.interaction };
        }
        var styleDrawObj = this.setStyleFunc(_drawObj, drawingProps.editStyle);
        var draw = new _Draw2.default(styleDrawObj);

        draw.on('drawend', function (evt) {
          _this10.onFeatureEvent('drawn', drawingProps.sourceName, [evt.feature], drawingProps.interaction);
        });

        this.activeInteractions = [draw];
      } else if (_constants.INTERACTIONS.measuring.includes(drawingProps.interaction)) {
        // clear the previous measure feature.
        this.props.clearMeasureFeature();

        var measureObj = {
          // The measure interactions are the same as the drawing interactions
          // but are prefixed with "measure:"
          type: drawingProps.interaction.split(':')[1]
        };
        var styleMeasureObj = this.setStyleFunc(measureObj, drawingProps.measureStyle);

        var measure = new _Draw2.default(styleMeasureObj);

        var measure_listener = null;
        measure.on('drawstart', function (evt) {
          var geom = evt.feature.getGeometry();
          var proj = _this10.map.getView().getProjection();

          measure_listener = geom.on('change', function (geomEvt) {
            _this10.props.setMeasureGeometry(geomEvt.target, proj);
          });

          _this10.props.setMeasureGeometry(geom, proj);
        });

        measure.on('drawend', function () {
          // remove the listener
          (0, _Observable.unByKey)(measure_listener);
          _this10.props.finalizeMeasureFeature();
        });

        this.activeInteractions = [measure];
      }
      this.addInteractions();
    }
  }, {
    key: 'addInteractions',
    value: function addInteractions() {
      if (this.activeInteractions) {
        for (var i = 0, ii = this.activeInteractions.length; i < ii; i++) {
          this.map.addInteraction(this.activeInteractions[i]);
        }
      }
    }
  }, {
    key: 'finishMeasureGeometry',
    value: function finishMeasureGeometry() {
      if (this.activeInteractions && this.activeInteractions.length === 1) {
        this.activeInteractions[0].finishDrawing();
      }
    }
  }, {
    key: 'setStyleFunc',
    value: function setStyleFunc(styleObj, style) {
      if (style) {
        styleObj.style = getOLStyleFunctionFromMapboxStyle(style);
      }
      return styleObj;
    }
  }, {
    key: 'getStyleFuncWithSprite',
    value: function getStyleFuncWithSprite(style) {
      if (style) {
        return getOLStyleFunctionFromMapboxStyleWithSprite(style, this.props.map.sprite);
      }
      return new Promise(function (resolve) {
        return resolve(null);
      });
    }
  }]);

  return Map;
}(_react2.default.Component);

Map.propTypes = _extends({}, _mapCommon2.default.propTypes, {
  /** Options to use for fetch calls */
  fetchOptions: _propTypes2.default.object,
  /** Should we declutter labels and symbols? */
  declutter: _propTypes2.default.bool,
  /** Tolerance in pixels for WFS BBOX type queries */
  tolerance: _propTypes2.default.number,
  /** onFeatureSelected callback, triggered on select event of the select interaction. */
  onFeatureSelected: _propTypes2.default.func,
  /** onFeatureDeselected callback, triggered when a feature gets deselected. */
  onFeatureDeselected: _propTypes2.default.func,
  /** onExportImage callback, done on postcompose. */
  onExportImage: _propTypes2.default.func,
  /** finalizeMeasureFeature callback, called when the measure feature is done.
   * @ignore
   */
  finalizeMeasureFeature: _propTypes2.default.func,
  /** Callback function that should generate a TIME based filter. */
  createLayerFilter: _propTypes2.default.func,
  /**
   * Should we stop events in the popup overlay?
   */
  stopEvent: _propTypes2.default.bool
});

Map.defaultProps = _extends({}, _mapCommon2.default.defaultProps, {
  stopEvent: false,
  fetchOptions: {
    credentials: 'same-origin'
  },
  tolerance: 4,
  declutter: false,
  onFeatureSelected: function onFeatureSelected() {},
  onFeatureDeselected: function onFeatureDeselected() {},
  onExportImage: function onExportImage() {},
  finalizeMeasureFeature: function finalizeMeasureFeature() {},
  createLayerFilter: function createLayerFilter() {},
  clearSourceErrors: function clearSourceErrors() {},
  setSourceError: function setSourceError() {}
});

function mapStateToProps(state) {
  return {
    map: state.map,
    drawing: state.drawing,
    print: state.print,
    mapbox: state.mapbox,
    size: state.mapinfo ? state.mapinfo.size : null,
    loading: state.mapinfo ? state.mapinfo.loading : false,
    requestedRedraws: state.mapinfo ? state.mapinfo.requestedRedraws : 0,
    sourceRedraws: state.mapinfo ? state.mapinfo.sourceRedraws : {}
  };
}

function getMapExtent(view, size) {
  var projection = view.getProjection();
  var targetProj = 'EPSG:4326';
  var view_extent = view.calculateExtent(size);
  return (0, _proj.transformExtent)(view_extent, projection, targetProj);
}

function mapDispatchToProps(dispatch) {
  return {
    updateLayer: function updateLayer(layerId, layerConfig) {
      dispatch((0, _map.updateLayer)(layerId, layerConfig));
    },
    setView: function setView(view) {
      dispatch((0, _map.setView)(view.center, view.zoom));
      dispatch((0, _map.setBearing)(view.bearing));
      dispatch((0, _mapinfo.setMapExtent)(view.extent));
      dispatch((0, _mapinfo.setResolution)(view.resolution));
    },
    setSize: function setSize(map) {
      var size = map.getSize();
      var view = map.getView();
      dispatch((0, _mapinfo.setMapExtent)(getMapExtent(view, size)));
      dispatch((0, _mapinfo.setMapSize)(size));
    },
    setProjection: function setProjection(projection) {
      dispatch((0, _mapinfo.setProjection)(projection));
    },
    setMeasureGeometry: function setMeasureGeometry(geometry, projection) {
      var geom = GEOJSON_FORMAT.writeGeometryObject(geometry, {
        featureProjection: projection,
        dataProjection: 'EPSG:4326'
      });
      var segments = [];
      if (geom.type === 'LineString') {
        for (var i = 0, ii = geom.coordinates.length - 1; i < ii; i++) {
          var a = geom.coordinates[i];
          var b = geom.coordinates[i + 1];
          segments.push((0, _sphere.getDistance)(a, b));
        }
      } else if (geom.type === 'Polygon' && geom.coordinates.length > 0) {
        segments.push((0, _sphere.getArea)(geometry, { projection: projection }));
      }

      dispatch((0, _drawing.setMeasureFeature)({
        type: 'Feature',
        properties: {},
        geometry: geom
      }, segments));
    },
    finalizeMeasureFeature: function finalizeMeasureFeature() {
      dispatch((0, _drawing.finalizeMeasureFeature)());
    },
    clearMeasureFeature: function clearMeasureFeature() {
      dispatch((0, _drawing.clearMeasureFeature)());
    },
    setMousePosition: function setMousePosition(lngLat, coordinate) {
      dispatch((0, _mapinfo.setMousePosition)(lngLat, coordinate));
    },
    setSourceError: function setSourceError(srcName) {
      dispatch((0, _mapinfo.setSourceError)(srcName));
    },
    clearSourceErrors: function clearSourceErrors() {
      dispatch((0, _mapinfo.clearSourceErrors)());
    },
    setMapLoading: function setMapLoading() {
      dispatch((0, _mapinfo.setMapLoading)());
    },
    setMapLoaded: function setMapLoaded() {
      dispatch((0, _mapinfo.setMapLoaded)());
    }
  };
}

function prepareLayersAndSources(styles) {
  var sources = {};
  for (var i = 0, ii = styles.length; i < ii; ++i) {
    var style = styles[i];
    var id = style.id;
    style.source = id;
    sources[id] = {
      type: 'geojson'
    };
  }
  var glStyle = {
    version: 8,
    layers: styles,
    sources: sources
  };
  var olLayer = new _Vector2.default();

  return {
    olLayer: olLayer,
    glStyle: glStyle,
    sources: styles.map(function (style) {
      return style.id;
    })
  };
}

function getOLStyleFunctionFromMapboxStyle(styles) {
  var _prepareLayersAndSour2 = prepareLayersAndSources(styles),
      olLayer = _prepareLayersAndSour2.olLayer,
      glStyle = _prepareLayersAndSour2.glStyle,
      sources = _prepareLayersAndSour2.sources;

  return (0, _stylefunction2.default)(olLayer, glStyle, sources);
}

// Ensure that withRef is set to true so getWrappedInstance will return the Map.
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, undefined, { withRef: true })(Map);