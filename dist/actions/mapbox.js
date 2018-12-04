'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;

var _actionTypes = require('../action-types');

/** Action to configure the baseUrl and accessToken.
 *  @param {Object} config The config object.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function configure(config) {
  return {
    type: _actionTypes.MAPBOX.CONFIGURE,
    baseUrl: config.baseUrl,
    accessToken: config.accessToken
  };
} /*
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

/** @module actions/mapbox
 *  @desc Actions for setting the Mapbox config.
 */