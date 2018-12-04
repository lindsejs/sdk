'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

var MAP = exports.MAP = {
  SET_VIEW: 'MAP_SET_VIEW',
  SET_ZOOM: 'MAP_SET_ZOOM',
  FIT_EXTENT: 'MAP_FIT_EXTENT',
  ZOOM_IN: 'MAP_ZOOM_IN',
  ZOOM_OUT: 'MAP_ZOOM_OUT',
  ADD_LAYER: 'MAP_ADD_LAYER',
  SET_NAME: 'MAP_SET_NAME',
  SET_BEARING: 'MAP_SET_BEARING',
  ADD_SOURCE: 'MAP_ADD_SOURCE',
  REMOVE_LAYER: 'MAP_REMOVE_LAYER',
  REMOVE_SOURCE: 'MAP_REMOVE_SOURCE',
  UPDATE_LAYER: 'MAP_UPDATE_LAYER',
  CLEAR_LAYER_FILTER: 'MAP_CLEAR_LAYER_FILTER',
  ADD_FEATURES: 'MAP_ADD_FEATURES',
  REMOVE_FEATURES: 'MAP_REMOVE_FEATURES',
  SET_LAYER_METADATA: 'MAP_SET_LAYER_METADATA',
  SET_LAYER_VISIBILITY: 'MAP_SET_LAYER_VISIBILITY',
  SET_LAYER_IN_GROUP_VISIBLE: 'MAP_SET_LAYER_IN_GROUP_VISIBLE',
  ORDER_LAYER: 'MAP_ORDER_LAYER',
  CLUSTER_POINTS: 'MAP_CLUSTER_POINTS',
  SET_CLUSTER_RADIUS: 'MAP_SET_CLUSTER_RADIUS',
  SET_SPRITE: 'MAP_SET_SPRITE',
  SET_GLYPHS: 'MAP_SET_GLYPHS',
  UPDATE_SOURCE: 'MAP_UPDATE_SOURCE',
  UPDATE_METADATA: 'MAP_UPDATE_METADATA',
  MOVE_GROUP: 'MAP_MOVE_GROUP',
  ADD_GROUP: 'MAP_ADD_GROUP',
  REMOVE_GROUP: 'MAP_REMOVE_GROUP'
};

var CONTEXT = exports.CONTEXT = {
  FETCH: 'CONTEXT_FETCH',
  RECEIVE: 'CONTEXT_RECEIVE'
};

var DRAWING = exports.DRAWING = {
  START: 'DRAWING_START',
  END: 'DRAWING_END',
  SET_MEASURE_FEATURE: 'DRAWING_SET_MEASURE_FEATURE',
  CLEAR_MEASURE_FEATURE: 'DRAWING_CLEAR_MEASURE_FEATURE',
  FINALIZE_MEASURE_FEATURE: 'DRAWING_FINALIZE_MEASURE_FEATURE',
  FINISH_MEASURE_GEOMETRY: 'DRAWING_FINISH_MEASURE_GEOMETRY',
  SET_EDIT_STYLE: 'DRAWING_SET_EDIT_STYLE',
  SET_SELECT_STYLE: 'DRAWING_SET_SELECT_STYLE',
  SET_MODIFY_STYLE: 'DRAWING_SET_MODIFY_STYLE',
  SET_MEASURE_STYLE: 'DRAWING_SET_MEASURE_STYLE'
};

var PRINT = exports.PRINT = {
  EXPORT_IMAGE: 'PRINT_EXPORT_IMAGE',
  RECEIVE_IMAGE: 'PRINT_RECEIVE_IMAGE'
};

var WFS = exports.WFS = {
  INSERT: 'WFS_INSERT',
  UPDATE: 'WFS_UPDATE',
  DELETE: 'WFS_DELETE',
  ADD_SOURCE: 'WFS_ADD_SOURCE',
  REMOVE_SOURCE: ' WFS_REMOVE_SOURCE',
  FINISHED: 'WFS_FINISHED'
};

var MAPBOX = exports.MAPBOX = {
  CONFIGURE: 'MAPBOX_CONFIGURE'
};

var ESRI = exports.ESRI = {
  ADD_SOURCE: 'ESRI_ADD_SOURCE',
  REMOVE_SOURCE: 'ESRI_REMOVE_SOURCE'
};

var MAPINFO = exports.MAPINFO = {
  SET_SIZE: 'MAPINFO.SET_SIZE',
  SET_MOUSE_POSITION: 'MAPINFO.SET_MOUSE_POSITION',
  SET_EXTENT: 'MAPINFO.SET_EXTENT',
  SET_RESOLUTION: 'MAPINFO.SET_RESOLUTION',
  SET_PROJECTION: 'MAPINFO.SET_PROJECTION',
  REQUEST_REDRAW: 'MAPINFO.REQUEST_REDRAW',
  REQUEST_SOURCE_REDRAW: 'MAPINFO.REQUEST_SOURCE_REDRAW',
  SET_SOURCE_ERROR: 'MAPINFO.SET_SOURCE_ERROR',
  CLEAR_SOURCE_ERRORS: 'MAPINFO.CLEAR_SOURCE_ERRORS',
  SET_MAP_LOADING: 'MAPINFO.SET_MAP_LOADING',
  SET_MAP_LOADED: 'MAPINFO.SET_MAP_LOADED'
};

/** Export all the action-types into a single "index" of action types.
 */
exports.default = {
  MAP: MAP,
  DRAWING: DRAWING,
  PRINT: PRINT,
  WFS: WFS,
  MAPBOX: MAPBOX,
  ESRI: ESRI,
  MAPINFO: MAPINFO
};