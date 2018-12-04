'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportMapImage = exportMapImage;
exports.receiveMapImage = receiveMapImage;

var _actionTypes = require('../action-types');

/** Action to export the current map image.
 *  @returns {Object} Action object to pass to reducer.
 */
function exportMapImage() {
  return {
    type: _actionTypes.PRINT.EXPORT_IMAGE
  };
}

/** Action to handle receipt of the map image.
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

/** @module actions/print
 *  @desc Actions for printing the map.
 */

function receiveMapImage() {
  return {
    type: _actionTypes.PRINT.RECEIVE_IMAGE
  };
}