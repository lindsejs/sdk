'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WfsReducer;

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _actionTypes = require('../action-types');

var _source = require('./source');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = {
  sources: {},
  actions: {}
};

/** Add a WFS action to the state.
 * @param {Object} state Current state.
 * @param {Object} action Action to handle.
 *
 * @returns {Object} The new state.
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

/** @module reducers/wfs
 * @desc WFS Reducer
 *
 *  Handles WFS requests.
 *
 */

function addAction(state, action) {
  var action_id = _uuid2.default.v4();

  var new_action = {};
  new_action[action_id] = action;

  var new_actions = Object.assign({}, state.actions, new_action);
  return Object.assign({}, state, { actions: new_actions });
}

/** Record a WFS action as finished in the state.
 * @param {Object} state Current state.
 * @param {Object} action Action to handle.
 *
 * @returns {Object} The new state.
 */
function finishedAction(state, action) {
  var new_actions = Object.assign({}, state.actions);
  delete new_actions[action.id];
  return Object.assign({}, state, { actions: new_actions });
}

/** Wfs reducer.
 *  @param {Object} state The redux state.
 *  @param {Object} action The selected action object.
 *
 *  @returns {Object} The new state object.
 */
function WfsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    // add a source to the WFS configuration
    case _actionTypes.WFS.ADD_SOURCE:
      return (0, _source.addSource)(state, action);
    // remove a source from the WFS configuration
    case _actionTypes.WFS.REMOVE_SOURCE:
      return (0, _source.removeSource)(state, action);
    case _actionTypes.WFS.INSERT:
    case _actionTypes.WFS.UPDATE:
    case _actionTypes.WFS.DELETE:
      return addAction(state, action);
    case _actionTypes.WFS.FINISHED:
      return finishedAction(state, action);
    default:
      return state;
  }
}