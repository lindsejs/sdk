"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSource = addSource;
exports.removeSource = removeSource;
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

/** @module reducers/source
 * @desc Common parts for source based reducers.
 */

/** Add a source to the state.
 * @param {Object} state Current state.
 * @param {Object} action Action to handle.
 *
 * @returns {Object} The new state.
 */
function addSource(state, action) {
  var new_source = {};
  new_source[action.sourceName] = action.sourceDef;

  var new_sources = Object.assign({}, state.sources, new_source);
  return Object.assign({}, state, {
    sources: new_sources
  });
}

/** Remove a source from the state.
 * @param {Object} state Current state.
 * @param {Object} action Action to handle.
 *
 * @returns {Object} The new state.
 */
function removeSource(state, action) {
  var new_sources = Object.assign({}, state.sources);
  delete new_sources[action.sourceName];
  return Object.assign({}, state, { sources: new_sources });
}