'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startDrawing = startDrawing;
exports.startModify = startModify;
exports.startSelect = startSelect;
exports.endDrawing = endDrawing;
exports.endModify = endModify;
exports.endSelect = endSelect;
exports.startMeasure = startMeasure;
exports.setMeasureFeature = setMeasureFeature;
exports.finalizeMeasureFeature = finalizeMeasureFeature;
exports.finishMeasureGeometry = finishMeasureGeometry;
exports.clearMeasureFeature = clearMeasureFeature;
exports.setEditStyle = setEditStyle;
exports.setSelectStyle = setSelectStyle;
exports.setModifyStyle = setModifyStyle;
exports.setMeasureStyle = setMeasureStyle;

var _actionTypes = require('../action-types');

var _constants = require('../constants');

/** Action to start an interaction on the map.
 *  @param {string} sourceName The name of the source on which the action takes place.
 *  @param {string} drawingType The type of drawing interaction.
 *  @param {string} afterMode The mode to be used after the drawing interaction finishes.
 *  @param {string} currentMode The mode to be used for drawing interaction.
 *  @param {Object} currentModeOptions The mode options for the currentMode.
 *  @param {Object} feature The feature that should get modified.
 *
 *  @returns {Object} An action object to pass to the reducer.
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

/** @module actions/drawing
 * @desc Actions for interacting with the map.
 */

function startDrawing(sourceName, drawingType, afterMode, currentMode, currentModeOptions, feature) {
  return {
    type: _actionTypes.DRAWING.START,
    interaction: drawingType,
    sourceName: sourceName,
    currentMode: currentMode,
    afterMode: afterMode,
    currentModeOptions: currentModeOptions,
    feature: feature
  };
}

/** Short-hand action to start modify-feature
 *  @param {string} sourceName The name of the source to modify.
 *  @param {string} afterMode The mode to be used after the drawing interaction finishes.
 *  @param {string} currentMode The mode to be used for drawing interaction.
 *  @param {Object} feature The feature that should get modified.
 *
 *  @returns {Object} Call to startDrawing()
 */
function startModify(sourceName, afterMode, currentMode, feature) {
  return startDrawing(sourceName, _constants.INTERACTIONS.modify, afterMode, currentMode, undefined, feature);
}

/** Short-hand action to start select-feature
 *  @param {string} sourceName The name of the source on which the feature to select is found.
 *
 *  @returns {Object} Call to startDrawing()
 */
function startSelect(sourceName) {
  return startDrawing(sourceName, _constants.INTERACTIONS.select);
}

/** Stop drawing / select / modify
 *  @param {string} afterMode The mode to be used after the drawing interaction finishes.
 *
 *  @returns {Object} An action object to pass to the reducer.
 */
function endDrawing(afterMode) {
  return {
    type: _actionTypes.DRAWING.END,
    afterMode: afterMode
  };
}

/** These are just aliases to end drawing.
 *  @param {string} afterMode The mode to be used after the drawing interaction finishes.
 *
 *  @returns {Object} Call to endDrawing().
 */
function endModify(afterMode) {
  return endDrawing(afterMode);
}

/** These are just aliases to end drawing.
 *  @returns {Object} Call to endDrawing().
 */
function endSelect() {
  return endDrawing();
}

/** Start measuring.
 *  @param {string} interaction Type of interation.
 *
 *  @returns {Object} Call to startDrawing().
 */
function startMeasure(interaction) {
  return startDrawing(null, interaction);
}

/** Set a measurement feature.
 *
 *  This is called each time the feature is updated.
 *
 *  @param {Object} feature  The feature in WGS84.
 *  @param {number[]} segments Array of the incremental measurements in meters.
 *                    [] for a Point, [total_area] for a polygon.
 *
 *  @returns {Object} A measurement action.
 */
function setMeasureFeature(feature, segments) {
  return {
    type: _actionTypes.DRAWING.SET_MEASURE_FEATURE,
    feature: feature,
    segments: segments
  };
}

/** Finalize a measurement feature.
 *
 *  This is called when the measure feature is done.
 *
 *  @returns {Object} A measurement action.
 */
function finalizeMeasureFeature() {
  return {
    type: _actionTypes.DRAWING.FINALIZE_MEASURE_FEATURE
  };
}

/** Finish the measure geometry.
 *
 *  Turn the sketch feature into a permanent feature.
 *
 *  @returns {Object} A measurement action.
 */
function finishMeasureGeometry() {
  return {
    type: _actionTypes.DRAWING.FINISH_MEASURE_GEOMETRY
  };
}

/** Clear the measurement feature.
 *  @returns {Object} An action object to pass to the reducer.
 */
function clearMeasureFeature() {
  return {
    type: _actionTypes.DRAWING.CLEAR_MEASURE_FEATURE
  };
}

/** Set the editing style.
 *  @param {Object} mbStyle The mapbox style to be used for the edit feature mode.
 *  @returns {Object} An action object to pass to the reducer.
 */
function setEditStyle(mbStyle) {
  return {
    type: _actionTypes.DRAWING.SET_EDIT_STYLE,
    editStyle: mbStyle
  };
}

/** Set the select style.
 *  @param {Object} mbStyle The mapbox style to be used for the select feature mode.
 *  @returns {Object} An action object to pass to the reducer.
 */
function setSelectStyle(mbStyle) {
  return {
    type: _actionTypes.DRAWING.SET_SELECT_STYLE,
    selectStyle: mbStyle
  };
}

/** Set the modify style.
 *  @param {Object} mbStyle The mapbox style to be used for the modify feature mode.
 *  @returns {Object} An action object to pass to the reducer.
 */
function setModifyStyle(mbStyle) {
  return {
    type: _actionTypes.DRAWING.SET_MODIFY_STYLE,
    modifyStyle: mbStyle
  };
}

/** Set the measure style.
 *  @param {Object} mbStyle The mapbox style to be used for the measure mode.
 *  @returns {Object} An action object to pass to the reducer.
 */
function setMeasureStyle(mbStyle) {
  return {
    type: _actionTypes.DRAWING.SET_MEASURE_STYLE,
    measureStyle: mbStyle
  };
}