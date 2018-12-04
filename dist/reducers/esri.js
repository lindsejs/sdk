'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EsriReducer;

var _actionTypes = require('../action-types');

var _source = require('./source');

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

/** @module reducers/esri
 * @desc Esri Reducer
 *
 *  Handles Esri ArcGIS REST requests.
 *
 */

var defaultState = {
  sources: {}
};

/** Esri reducer.
 *  @param {Object} state The redux state.
 *  @param {Object} action The selected action object.
 *
 *  @returns {Object} The new state object.
 */
function EsriReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case _actionTypes.ESRI.ADD_SOURCE:
      return (0, _source.addSource)(state, action);
    case _actionTypes.ESRI.REMOVE_SOURCE:
      return (0, _source.removeSource)(state, action);
    default:
      return state;
  }
}