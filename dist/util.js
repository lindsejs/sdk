'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonEquals = jsonEquals;
exports.getResolutionForZoom = getResolutionForZoom;
exports.getZoomForResolution = getZoomForResolution;
exports.getResolutionForExtent = getResolutionForExtent;
exports.getLayerById = getLayerById;
exports.getGroup = getGroup;
exports.parseQueryString = parseQueryString;
exports.encodeQueryObject = encodeQueryObject;
exports.reprojectGeoJson = reprojectGeoJson;
exports.degreesToRadians = degreesToRadians;
exports.radiansToDegrees = radiansToDegrees;
exports.jsonClone = jsonClone;
exports.getKey = getKey;
exports.isLayerVisible = isLayerVisible;
exports.getLayerIndexById = getLayerIndexById;
exports.getLayerTitle = getLayerTitle;
exports.getLayersByGroup = getLayersByGroup;
exports.optionalEquals = optionalEquals;
exports.hasSourceError = hasSourceError;

var _constants = require('./constants');

var _GeoJSON = require('ol/format/GeoJSON');

var _GeoJSON2 = _interopRequireDefault(_GeoJSON);

var _proj = require('ol/proj');

var _View = require('ol/View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @module util
 * @desc functions for Boundless SDK.
 *
 *  This is the grab bag of universally useful functions.
 */

/** Compares two objects using JSON.stringify.
 *
 * @param {Object} objectA The first object to be compared.
 * @param {Object} objectB An object to compare with objectA.
 *
 * @returns {boolean} True if objectA and objectB are deeply equal, false if not.
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

function jsonEquals(objectA, objectB) {
  return JSON.stringify(objectA) === JSON.stringify(objectB);
}

/** Gets the resolution for a zoom level in spherical mercator.
 *
 * @param {number} zoom The zoom level.
 * @param {string} projection The map projection.
 *
 * @returns {number} The resolution for that zoom level.
 */
function getResolutionForZoom(zoom, projection) {
  var view = new _View2.default({ projection: projection });
  return view.getResolutionForZoom(zoom) / 2;
}

/** Gets the zoom level for a resolution in spherical mercator.
 *
 * @param {number} resolution The resolution.
 * @param {string} projection The map projection.
 *
 * @returns {number} The zoom level for that zoom resolution.
 */
function getZoomForResolution(resolution, projection) {
  var view = new _View2.default({ projection: projection });
  return view.getZoomForResolution(resolution) - 1;
}

/** Gets the resolution for a specific extent.
 *
 * @param {number[]} extent The extent to consider.
 * @param {number[]} size The size of the map.
 * @param {string} projection The projection of the map.
 *
 * @returns {number} The resolution to use when zooming to the extent.
 */
function getResolutionForExtent(extent, size, projection) {
  var bbox = (0, _proj.transformExtent)(extent, 'EPSG:4326', projection);
  var xResolution = (bbox[2] - bbox[0]) / size[0];
  var yResolution = (bbox[3] - bbox[1]) / size[1];
  return Math.max(xResolution, yResolution);
}

/** Gets a layer by it's id. https://www.mapbox.com/mapbox-gl-js/style-spec/#layer-id
 *
 * @param {Object[]} layers An array of Mapbox GL layer objects.
 * @param {string} layers[].id - The id of a given layer.
 * @param {string} id The id of the layer object to be returned.
 *
 * @returns {(Object|null)} The Mapbox GL layer object, or null if not found.
 */
function getLayerById(layers, id) {
  for (var i = 0, ii = layers.length; i < ii; i++) {
    if (layers[i].id === id) {
      return layers[i];
    }
  }
  return null;
}

/** Get the group from the layer or null if it doesn't exist.
 *
 * @param {Object} layer The layer.
 *
 * @returns {string|null} The group.
 */
function getGroup(layer) {
  var layerGroup = null;
  if (layer && layer.metadata && layer.metadata[_constants.GROUP_KEY]) {
    layerGroup = layer.metadata[_constants.GROUP_KEY];
  }
  return layerGroup;
}

/** Parses an arbitrary string as if it were a URL.
 *
 * @param {string} queryString The query string to parse.
 *
 * @returns {Object} An object containing the key-value-pairs of the parsed query string.
 */
function parseQueryString(queryString) {
  var pairs = queryString.split('&');
  var results = {};
  for (var i = 0, ii = pairs.length; i < ii; i++) {
    // Using index of and substring has two advantages over split:
    // 1. It more gracefully handles components which have a = in them erroneously.
    // 2. It's slightly faster than using split.
    var pos = pairs[i].indexOf('=');
    var key = pairs[i].substring(0, pos);
    var value = decodeURIComponent(pairs[i].substring(pos + 1));

    results[key] = value;
  }
  return results;
}

/** Converts an object into a query string.
 *
 * @param {Object} query An object representing key-value-pairs to encode.
 *
 * @returns {string} A URL encoded string.
 */
function encodeQueryObject(query) {
  var keys = Object.keys(query);
  var pairs = [];
  for (var i = 0, ii = keys.length; i < ii; i++) {
    var value = encodeURIComponent(query[keys[i]]);
    pairs.push(keys[i] + '=' + value);
  }
  return pairs.join('&');
}

/** Reprojects GeoJSON to Mapbox gl style spec EPSG:4326
 *
 * @param {Object} geoJSON - The geoJSON object to reproject.
 * @param {Object[]} geoJSON.features - An array of geoJSON features.
 * @param {string} [destProj = 'EPSG:4326'] A string of target projection for the data. The default is 'EPSG:4326'.
 *
 * @returns {Object[]} An array of geoJSON features in the destination projection (destProj).
 */
function reprojectGeoJson(geoJSON) {
  var destProj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'EPSG:4326';

  var GEOJSON_FORMAT = new _GeoJSON2.default();
  var crsName = GEOJSON_FORMAT.readProjectionFromObject(geoJSON).getCode();

  var readFeatureOptions = {
    featureProjection: destProj,
    dataProjection: crsName
  };

  var writeFeatureOptions = {
    featureProjection: destProj,
    dataProjection: destProj
  };

  var new_data = {
    type: 'FeatureCollection',
    features: geoJSON.features
  };

  var features = GEOJSON_FORMAT.writeFeaturesObject(GEOJSON_FORMAT.readFeatures(new_data, readFeatureOptions), writeFeatureOptions);
  return features.features;
}

/** Converts degrees to radians.
 *
 * @param {number} degrees The bearing value on a Mapbox GL map object.
 *
 * @returns {number} The rotation value on the OpenLayers map object in radians.
 */
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

/** Converts radians to degrees.
 *
 * @param {number} radians The rotation value on an OpenLayers map object.
 *
 * @returns {number} The bearing value on the Mapbox GL map object in degrees.
 */
function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}

/** Uses JSON utilities to clone an object.
 *
 * @param {Object} object An object to be cloned.
 *
 * @returns {Object} The cloned object.
 */
function jsonClone(object) {
  return JSON.parse(JSON.stringify(object));
}

/** Get a key from a dictionary with proper handling
 *  of when the dictionary is undefined.
 *
 *  @param {(Object|undefined)} dictionary An object or undefined.
 *  @param {string} key The key to pull from the dictionary.
 *
 *  @returns {(number|undefined)} Value.
 */
function getKey(dictionary, key) {
  if (dictionary === undefined || dictionary === null) {
    return dictionary;
  }
  return dictionary[key];
}

/** Check the visibility of a layer.
 *
 *  @param {Object} layer The layer to check.
 *
 *  @returns {boolean} true when visible, false when not.
 */
function isLayerVisible(layer) {
  if (layer !== undefined && layer.layout !== undefined) {
    return layer.layout.visibility !== 'none';
  }
  return true;
}

/** Get the z-index of a layer.
 *
 *  @param {Array} layers The list of layers.
 *  @param {string} id The id of the layer to find.
 *
 * @returns {number} Index of the layer, or -1 if not found.
 */
function getLayerIndexById(layers, id) {
  for (var i = layers.length - 1, ii = 0; i >= ii; i--) {
    if (layers[i].id === id) {
      return i;
    }
  }
  return -1;
}

/** Get the title of a layer.
 *
 *  @param {Object} layer The layer.
 *
 * @returns {string} The title of the layer.
 */
function getLayerTitle(layer) {
  if (layer.metadata && layer.metadata[_constants.TITLE_KEY]) {
    return layer.metadata[_constants.TITLE_KEY];
  }
  return layer.id;
}

/** Get a list of layers based on the group
 *
 *  @param {Array} layers The list of layers.
 *  @param {string} groupId the group ID
 *
 * @return {Array} of matching layers.
 */
function getLayersByGroup(layers, groupId) {
  var group_layers = [];
  for (var i = 0, ii = layers.length; i < ii; i++) {
    if (getGroup(layers[i]) === groupId) {
      group_layers.push(layers[i]);
    }
  }
  return group_layers;
}

/** Compare the value of a prop from an optional state-tree.
 *
 *  @param {Object} state - Current state.
 *  @param {Object} nextState - Next state.
 *  @param {String} reducerName - The "subtree" that may or may not exist.
 *  @param {String} prop - The name of the prop to compare between states.
 *
 *  @returns {Boolean} true if equal and false if values differ.
 */
function optionalEquals(state, nextState, reducerName, prop) {
  var subtree = state[reducerName];
  var next_subtree = nextState[reducerName];

  if (subtree === undefined && next_subtree === undefined) {
    return true;
  }

  var value = subtree === undefined ? undefined : subtree[prop];
  var nextValue = next_subtree === undefined ? undefined : next_subtree[prop];

  return jsonEquals(value, nextValue);
}

/** Check if the layer's source has an error set.
 *  This requires the MapInfo reducer for sourceErrors to
 *  be set.
 *
 *  @param {Object} layerDef The definition of the layer from the state.
 *  @param {Object} sourceErrors The sourceErrors object from the mapinfo reducer.
 *
 * @returns {Boolean} true when an error, false otherwise.
 */
function hasSourceError(layerDef, sourceErrors) {
  return sourceErrors && sourceErrors[layerDef.source] === true;
}