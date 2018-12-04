'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setView = setView;
exports.zoomIn = zoomIn;
exports.zoomOut = zoomOut;
exports.setZoom = setZoom;
exports.fitExtent = fitExtent;
exports.setMapName = setMapName;
exports.setBearing = setBearing;
exports.addLayer = addLayer;
exports.addSource = addSource;
exports.removeLayer = removeLayer;
exports.removeSource = removeSource;
exports.updateLayer = updateLayer;
exports.clearLayerFilter = clearLayerFilter;
exports.clusterPoints = clusterPoints;
exports.setClusterRadius = setClusterRadius;
exports.addFeatures = addFeatures;
exports.removeFeatures = removeFeatures;
exports.setLayerVisibility = setLayerVisibility;
exports.setLayerInGroupVisible = setLayerInGroupVisible;
exports.setLayerMetadata = setLayerMetadata;
exports.setLayerTitle = setLayerTitle;
exports.setLayerTime = setLayerTime;
exports.fetchContext = fetchContext;
exports.receiveContext = receiveContext;
exports.orderLayer = orderLayer;
exports.setSprite = setSprite;
exports.setGlyphs = setGlyphs;
exports.updateMetadata = updateMetadata;
exports.addGroup = addGroup;
exports.removeGroup = removeGroup;
exports.updateSource = updateSource;
exports.setMapTime = setMapTime;
exports.moveGroup = moveGroup;
exports.addWmsSource = addWmsSource;
exports.addWfsSource = addWfsSource;
exports.addTmsSource = addTmsSource;
exports.addOsmSource = addOsmSource;

var _actionTypes = require('../action-types');

var _constants = require('../constants');

var _util = require('../util');

var sourceTypes = ['vector', 'raster', 'geojson', 'image', 'video', 'canvas'];

/** Action to update the center and zoom values in map state.
 *  @param {number[]} center Center coordinates.
 *  @param {number} zoom Zoom value.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
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

/** @module actions/map
 * @desc Action Defintions for the map.
 */

function setView(center, zoom) {
  return {
    type: _actionTypes.MAP.SET_VIEW,
    view: { center: center, zoom: zoom }
  };
}

/** Action to zoom in on the map.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function zoomIn() {
  return {
    type: _actionTypes.MAP.ZOOM_IN
  };
}

/** Action to zoom out on the map.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function zoomOut() {
  return {
    type: _actionTypes.MAP.ZOOM_OUT
  };
}

/** Action to set the zoom level.
 *  @param {number} zoom Zoom value.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function setZoom(zoom) {
  return {
    type: _actionTypes.MAP.SET_ZOOM,
    zoom: zoom
  };
}

/** Action to fit an extent.
 *  @param {number[]} extent The extent to zoom to.
 *  @param {number[]} size The size of the map.
 *  @param {string} projection The projection of the map.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function fitExtent(extent, size, projection) {
  return {
    type: _actionTypes.MAP.FIT_EXTENT,
    extent: extent,
    size: size,
    projection: projection
  };
}

/** Action to update the map name in map state.
 *  @param {string} name Map name.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function setMapName(name) {
  return {
    type: _actionTypes.MAP.SET_NAME,
    name: name
  };
}

/** Action to update the map bearing value in map state.
 *  @param {number} bearing Bearing value to set in degrees.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function setBearing(bearing) {
  return {
    type: _actionTypes.MAP.SET_BEARING,
    bearing: bearing
  };
}

/** Action to add a layer object in the map state.
 *  @param {Object} layerDef Layer properties.
 *  @param {string} layerTitle Title of the layer to be added.
 *  @param {string} positionId String id for the layer.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function addLayer(layerDef, layerTitle, positionId) {
  return {
    type: _actionTypes.MAP.ADD_LAYER,
    layerDef: layerDef,
    layerTitle: layerTitle,
    positionId: positionId
  };
}

/** Action to add a source object in the map state.
 *  @param {string} sourceName Name of the source to be added.
 *  @param {Object} sourceDef Source properties.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function addSource(sourceName, sourceDef) {
  if (sourceTypes.indexOf(sourceDef.type) === -1) {
    throw new Error('Invalid source type: ' + sourceDef.type + '.  Valid source types are ' + sourceTypes.toString());
  }
  return {
    type: _actionTypes.MAP.ADD_SOURCE,
    sourceName: sourceName,
    sourceDef: sourceDef
  };
}

/** Action to remove a layer object in the map state.
 *  @param {string} layerId String id for the layer.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function removeLayer(layerId) {
  return {
    type: _actionTypes.MAP.REMOVE_LAYER,
    layerId: layerId
  };
}

/** Action to remove a source object in the map state.
 *  @param {string} sourceName Name of the source to be added.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function removeSource(sourceName) {
  return {
    type: _actionTypes.MAP.REMOVE_SOURCE,
    sourceName: sourceName
  };
}

/** Action to update a layer object in the map state.
 *  @param {string} layerId String id for the layer to be updated.
 *  @param {Object} layerDef Layer properties.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function updateLayer(layerId, layerDef) {
  return {
    type: _actionTypes.MAP.UPDATE_LAYER,
    layerId: layerId,
    layerDef: layerDef
  };
}

/** Action to clear an existing filter on a layer.
 *  @param {string} layerId String id for the layer for which the filter is to be cleared.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function clearLayerFilter(layerId) {
  return {
    type: _actionTypes.MAP.CLEAR_LAYER_FILTER,
    layerId: layerId
  };
}

/** Action to update cluster status in the map state.
 *  @param {string} sourceName Name of the source to be added.
 *  @param {boolean} isClustered Is the source clustered?
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function clusterPoints(sourceName, isClustered) {
  return {
    type: _actionTypes.MAP.CLUSTER_POINTS,
    sourceName: sourceName,
    cluster: isClustered
  };
}

/** Set the radius of a clustering layer.
 *
 *  When set to a layer without clustering this will
 *  have no effect.
 *
 *  @param {Object} sourceName Name of the source on which the features are clustered.
 *  @param {number} radius Cluster radius.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function setClusterRadius(sourceName, radius) {
  return {
    type: _actionTypes.MAP.SET_CLUSTER_RADIUS,
    sourceName: sourceName,
    radius: radius
  };
}

/** Add features to a source on the map.
 *
 *  @param {Object} sourceName Name of the source on which the features will be added.
 *  @param {Object[]} features An array of features to add.
 *  @param {number} position The position at which to add the features.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function addFeatures(sourceName, features) {
  var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

  return {
    type: _actionTypes.MAP.ADD_FEATURES,
    sourceName: sourceName,
    features: features,
    position: position
  };
}

/** Remove features from a source on the map. If no filter is provided, all features
 *  will get removed from the source.
 *
 *  @param {Object} sourceName Name of the source on which the features will be removed.
 *  @param {string[]} filter Rule determining which features will be removed.
 *  See https://www.mapbox.com/mapbox-gl-js/style-spec/#types-filter.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function removeFeatures(sourceName, filter) {
  return {
    type: _actionTypes.MAP.REMOVE_FEATURES,
    sourceName: sourceName,
    filter: filter
  };
}

/** Change the visibility of a given layer in the map state.
 *
 *  @param {string} layerId String id for the layer.
 *  @param {string} visibility 'none' or 'visible'.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function setLayerVisibility(layerId, visibility) {
  return {
    type: _actionTypes.MAP.SET_LAYER_VISIBILITY,
    layerId: layerId,
    visibility: visibility
  };
}

/** Set a layer visible in a mutually exclusive group.
 *
 *  @param {string} layerId String id for the layer to turn on.
 *  @param {string} groupId String id for the layer group.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function setLayerInGroupVisible(layerId, groupId) {
  return {
    type: _actionTypes.MAP.SET_LAYER_IN_GROUP_VISIBLE,
    layerId: layerId,
    groupId: groupId
  };
}

/** Change the metadata object in a given layer in the map state.
 *
 *  @param {string} layerId String id for the layer.
 *  @param {string} itemName A key.
 *  @param {number} itemValue A value.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function setLayerMetadata(layerId, itemName, itemValue) {
  return {
    type: _actionTypes.MAP.SET_LAYER_METADATA,
    layerId: layerId,
    key: itemName,
    value: itemValue
  };
}

/** Set a layer's title in the map state.
 *
 *  @param {string} layerId String id for the layer.
 *  @param {string} title A string representing a layer title.
 *
 *  @returns {Object} Call to setLayerMetadata for a title key.
 */
function setLayerTitle(layerId, title) {
  return setLayerMetadata(layerId, _constants.TITLE_KEY, title);
}

/** Set a layer's time property in the map state.
 *
 *  @param {string} layerId String id for the layer.
 *  @param {*} time The value of time assigned to the layer.
 *
 *  @returns {Object} Call to setLayerMetadata for a time key.
 */
function setLayerTime(layerId, time) {
  return setLayerMetadata(layerId, _constants.TIME_KEY, time);
}

/** Fetch a Mapbox GL style object.
 *
 *  @param {Object} options A context object that must provide a Mapbox GL json
 *  object either via a json property or a from a url fetch.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function fetchContext(options) {
  return {
    type: _actionTypes.CONTEXT.FETCH,
    options: options
  };
}

/** Receive a Mapbox GL style object.
 *
 *  @param {Object} context Mapbox GL style object to populate the map state.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function receiveContext(context) {
  return {
    type: _actionTypes.CONTEXT.RECEIVE,
    context: context
  };
}

/** Rearrange a layer in the list.
 *
 *  @param {string} layerId the layer to move.
 *  @param {string} targetLayerId The ID of the layer to move the layerId BEFORE.
 *                       When null or undefined, moves the layer to the end
 *                       of the list.
 *
 *  @returns {Object} An action object.
 */
function orderLayer(layerId, targetLayerId) {
  return {
    type: _actionTypes.MAP.ORDER_LAYER,
    layerId: layerId,
    targetId: targetLayerId
  };
}

/** Set the sprite for the map.
 *
 *  @param {string} spriteRoot The URI to the sprite data without the .json/.png suffix.
 *
 *  @returns {Object} An action object.
 */
function setSprite(spriteRoot) {
  return {
    type: _actionTypes.MAP.SET_SPRITE,
    sprite: spriteRoot
  };
}

/** Set the glyphs for the map.
 *
 *  @param {string} glyphs The URL template for the glyphs sets.
 *
 *  @returns {Object} An action object.
 */
function setGlyphs(glyphs) {
  return {
    type: _actionTypes.MAP.SET_GLYPHS,
    glyphs: glyphs
  };
}

/** Update the map's metadata.
 *
 *  @param {Object} metadata An object containing new/updated metadata.
 *
 *  @returns {Object} An action object.
 */
function updateMetadata(metadata) {
  return {
    type: _actionTypes.MAP.UPDATE_METADATA,
    metadata: metadata
  };
}

/** Add a group to the map's metadata.
 *
 * @param {string} id Identifier of the group.
 * @param {Object} config Configuration of the group.
 *
 * @returns {Object} An action object.
 */
function addGroup(id, config) {
  return {
    type: _actionTypes.MAP.ADD_GROUP,
    id: id,
    config: config
  };
}

/** Remove a group from the map's metadata.
 *
 * @param {string} id Identifier of the group.
 *
 * @returns {Object} An action object.
 */
function removeGroup(id) {
  return {
    type: _actionTypes.MAP.REMOVE_GROUP,
    id: id
  };
}

/** Manually update a source.
 *
 *  @param {string} sourceName The name of the source to be updated.
 *  @param {Object} update The changes to the sourceDef to apply.
 *
 *  @returns {Object} An action object to pass to the reducer
 */
function updateSource(sourceName, update) {
  return {
    type: _actionTypes.MAP.UPDATE_SOURCE,
    sourceName: sourceName,
    sourceDef: update
  };
}

/** Set the time of the map.
 *
 *  @param {string} time An ISO date time string.
 *
 *  @returns {Object} An action object.
 */
function setMapTime(time) {
  var metadata = {};
  metadata[_constants.TIME_KEY] = time;
  return updateMetadata(metadata);
}

/** Create an action for moving a group
 *
 *  @param {string} group Group name.
 *  @param {string} layerId Layer id of the new place for the layer.
 *
 *  @returns {object} An action object.
 */
function moveGroup(group, layerId) {
  return {
    type: _actionTypes.MAP.MOVE_GROUP,
    placeAt: layerId,
    group: group
  };
}

/** Add a WMS source.
 *
 * @param {string} sourceId - new ID for the source.
 * @param {string} serverUrl - URL for the service.
 * @param {string} layerName - WFS feature type.
 * @param {Object} options - Optional settings. Honors: accessToken, projection, asVector, tileSize, extraParams
 *
 * @returns {Object} Action to create a new source.
 */
function addWmsSource(sourceId, serverUrl, layerName) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var tile_size = options.tileSize ? options.tileSize : 256;
  var projection = options.projection ? options.projection : 'EPSG:3857';
  // default behaviour is vector
  var format = options.asVector !== false ? 'application/x-protobuf;type=mapbox-vector' : 'image/png';

  var params = {
    'SERVICE': 'WMS',
    'VERSION': '1.3.0',
    'REQUEST': 'GetMap',
    'FORMAT': format,
    'TRANSPARENT': 'TRUE',
    'LAYERS': layerName,
    'WIDTH': tile_size,
    'HEIGHT': tile_size,
    'CRS': projection
  };

  if (options.accessToken) {
    params['ACCESS_TOKEN'] = options.accessToken;
  }

  if (options.extraParams) {
    params = Object.assign(params, options.extraParams);
  }

  // the BBOX is not escaped because the "{" and "}" are used for string
  // substitution in the library.
  var url_template = serverUrl + '?' + (0, _util.encodeQueryObject)(params) + '&BBOX={bbox-epsg-3857}';

  if (options.asVector !== false) {
    return addSource(sourceId, {
      type: 'vector',
      tiles: [url_template]
    });
  } else {
    return addSource(sourceId, {
      type: 'raster',
      tileSize: tile_size,
      tiles: [url_template]
    });
  }
}

/** Add a WFS / GeoJSON source.
 *
 * @param {string} sourceId - new ID for the source.
 * @param {string} serverUrl - URL for the service.
 * @param {string} featureType - WFS feature type.
 * @param {Object} options - Optional settings. Honors: accessToken
 *
 * @returns {Object} Action to create a new source.
 */
function addWfsSource(sourceId, serverUrl, featureType) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var params = {
    'SERVICE': 'WFS',
    'VERSION': '1.1.0',
    // projection is always fixed for WFS sources as they
    // are reprojected on the client.
    'SRSNAME': 'EPSG:4326',
    'REQUEST': 'GetFeature',
    'TYPENAME': featureType,
    'OUTPUTFORMAT': 'JSON'
  };

  if (options.accessToken) {
    params['ACCESS_TOKEN'] = options.accessToken;
  }

  return addSource(sourceId, {
    type: 'geojson',
    data: serverUrl + '?' + (0, _util.encodeQueryObject)(params)
  });
}

/** Add a Mapbox Vector Tile layer from a TMS service.
 *
 * @param {string} sourceId - new ID for the source.
 * @param {string} serverUrl - URL for the service.
 * @param {string} layerName - Name of the layer.
 * @param {Object} options - Optional settings. Honors: accessToken
 *
 * @returns {Object} Action to create a new source.
 */
function addTmsSource(sourceId, serverUrl, layerName) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var token_string = options.accessToken ? 'access_token=' + options.accessToken : '';

  var url = serverUrl + '/gwc/service/tms/1.0.0/' + layerName + '@EPSG%3A3857@pbf/{z}/{x}/{-y}.pbf?' + token_string;

  return addSource(sourceId, {
    type: 'vector',
    tiles: [url]
  });
}

/** Add an OSM raster tile source
 *
 * @param {string} sourceId - new ID for the source.
 *
 * @returns {Object} Action to create a new source.
 */
function addOsmSource(sourceId) {
  return addSource(sourceId, {
    type: 'raster',
    tileSize: 256,
    maxzoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.',
    tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png', 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png']
  });
}