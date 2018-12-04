'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMapSize = setMapSize;
exports.setMousePosition = setMousePosition;
exports.setMapExtent = setMapExtent;
exports.setResolution = setResolution;
exports.setProjection = setProjection;
exports.requestRedraw = requestRedraw;
exports.requestSourceRedraw = requestSourceRedraw;
exports.setSourceError = setSourceError;
exports.clearSourceErrors = clearSourceErrors;
exports.setMapLoading = setMapLoading;
exports.setMapLoaded = setMapLoaded;

var _actionTypes = require('../action-types');

/** Action to set the map size.
 *  @param {number[]} size Map size in pixels.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function setMapSize(size) {
  return {
    type: _actionTypes.MAPINFO.SET_SIZE,
    size: size
  };
}

/** Action to set the current mouse position.
 *  @param {Object} lngLat The longitude latitude object.
 *  @param {number[]} coordinate Coordinate pair in map projection.
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

/** @module actions/mapinfo
 *  @desc Actions for setting info about the map.
 */

function setMousePosition(lngLat, coordinate) {
  return {
    type: _actionTypes.MAPINFO.SET_MOUSE_POSITION,
    lngLat: lngLat,
    coordinate: coordinate
  };
}

/** Action to set the map extent.
 *  @param {number[]} extent Map extent in EPSG:4326.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function setMapExtent(extent) {
  return {
    type: _actionTypes.MAPINFO.SET_EXTENT,
    extent: extent
  };
}

/** Action to set the resolution.
 *  @param {number} resolution Resolution.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function setResolution(resolution) {
  return {
    type: _actionTypes.MAPINFO.SET_RESOLUTION,
    resolution: resolution
  };
}

/** Action to set the projection.
 *  @param {string} projection Projection.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function setProjection(projection) {
  return {
    type: _actionTypes.MAPINFO.SET_PROJECTION,
    projection: projection
  };
}

/** Request that the map redraws.
 *
 *  @returns {Object} Action object to request a map redraw.
 */
function requestRedraw() {
  return {
    type: _actionTypes.MAPINFO.REQUEST_REDRAW
  };
}

/** Request that a source redraws.
 *
 *  @param {String} srcName - The name of the source to redraw.
 *
 *  @returns {Object} Action object to request a source redraw.
 */
function requestSourceRedraw(srcName) {
  return {
    type: _actionTypes.MAPINFO.REQUEST_SOURCE_REDRAW,
    srcName: srcName
  };
}

/** Set an error for a source.
 *
 *  @param {String} srcName - The name of the source with the error
 *
 *  @returns {Object} Action object to set a source error.
 */
function setSourceError(srcName) {
  return {
    type: _actionTypes.MAPINFO.SET_SOURCE_ERROR,
    srcName: srcName
  };
}

/** Clear the source errors
 *
 *  @returns {Object} Action object to clear all the source errors
 */
function clearSourceErrors() {
  return {
    type: _actionTypes.MAPINFO.CLEAR_SOURCE_ERRORS
  };
}

/** Sets the map state to loading.
 *
 *  @returns {Object} Action object to set the map state to loading.
 */
function setMapLoading() {
  return {
    type: _actionTypes.MAPINFO.SET_MAP_LOADING
  };
}

/** Sets the map state to loaded.
 *
 *  @returns {Object} Action object to set the map state to loaded.
 */
function setMapLoaded() {
  return {
    type: _actionTypes.MAPINFO.SET_MAP_LOADED
  };
}