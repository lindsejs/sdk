'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = drawingReducer;

var _actionTypes = require('../action-types');

var defaultState = {
  interaction: null,
  sourceName: null,
  feature: null,
  measureFeature: null,
  measureSegments: null,
  currentMode: null,
  afterMode: null,
  currentModeOptions: null,
  measureDone: false,
  editStyle: null,
  modifyStyle: null,
  selectStyle: null,
  measureStyle: null
};

/** Drawing reducer.
 *  @param {Object} state The redux state.
 *  @param {Object} action The selected action object.
 *
 *  @returns {Object} The new state object.
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

/** @module reducers/drawing
 * @desc Drawing Reducer
 *
 *  This initiates drawing on the map and can track
 *  changes as they are made.
 *
 */

function drawingReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case _actionTypes.DRAWING.END:
      // when interaction is null, drawing should cease.
      return Object.assign({}, state, {
        interaction: null,
        sourceName: null,
        currentMode: action.currentMode,
        afterMode: action.afterMode,
        currentModeOptions: null,
        measureDone: false,
        measureFeature: null,
        measureSegments: null
      });
    case _actionTypes.DRAWING.START:
      return Object.assign({}, state, {
        interaction: action.interaction,
        sourceName: action.sourceName,
        currentMode: action.currentMode,
        afterMode: action.afterMode,
        currentModeOptions: action.currentModeOptions,
        measureDone: false,
        measureFeature: null,
        measureSegments: null,
        feature: action.feature
      });
    case _actionTypes.DRAWING.SET_EDIT_STYLE:
      return Object.assign({}, state, {
        editStyle: action.editStyle
      });
    case _actionTypes.DRAWING.SET_SELECT_STYLE:
      return Object.assign({}, state, {
        selectStyle: action.selectStyle
      });
    case _actionTypes.DRAWING.SET_MODIFY_STYLE:
      return Object.assign({}, state, {
        modifyStyle: action.modifyStyle
      });
    case _actionTypes.DRAWING.SET_MEASURE_STYLE:
      return Object.assign({}, state, {
        measureStyle: action.measureStyle
      });
    case _actionTypes.DRAWING.SET_MEASURE_FEATURE:
      return Object.assign({}, state, {
        measureDone: false,
        measureFeature: action.feature,
        measureSegments: action.segments
      });
    case _actionTypes.DRAWING.FINALIZE_MEASURE_FEATURE:
      return Object.assign({}, state, {
        measureDone: true,
        measureFinishGeometry: false
      });
    case _actionTypes.DRAWING.FINISH_MEASURE_GEOMETRY:
      return Object.assign({}, state, {
        measureFinishGeometry: true
      });
    case _actionTypes.DRAWING.CLEAR_MEASURE_FEATURE:
      return Object.assign({}, state, {
        measureFeature: null,
        measureSegments: null,
        measureDone: false
      });
    default:
      return state;
  }
}