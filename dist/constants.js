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

/**
 *  A collection of useful constants.
 *  @ignore
 */

var LAYER_VERSION_KEY = exports.LAYER_VERSION_KEY = 'bnd:layer-version';
var SOURCE_VERSION_KEY = exports.SOURCE_VERSION_KEY = 'bnd:source-version';
var SOURCES_FETCH_OPTIONS_KEY = exports.SOURCES_FETCH_OPTIONS_KEY = 'bnd-sources-fetch-options';
var TITLE_KEY = exports.TITLE_KEY = 'bnd:title';
var TIME_KEY = exports.TIME_KEY = 'bnd:time';
var TIME_START_KEY = exports.TIME_START_KEY = 'bnd:start-time';
var TIME_END_KEY = exports.TIME_END_KEY = 'bnd:end-time';
var DATA_VERSION_KEY = exports.DATA_VERSION_KEY = 'bnd:data-version';
var GROUPS_KEY = exports.GROUPS_KEY = 'mapbox:groups';
var GROUP_KEY = exports.GROUP_KEY = 'mapbox:group';
var LAYERLIST_HIDE_KEY = exports.LAYERLIST_HIDE_KEY = 'bnd:hide-layerlist';
var QUERYABLE_KEY = exports.QUERYABLE_KEY = 'bnd:queryable';
var QUERY_ENDPOINT_KEY = exports.QUERY_ENDPOINT_KEY = 'bnd:query-endpoint';
var QUERY_TYPE_KEY = exports.QUERY_TYPE_KEY = 'bnd:query-type';
var QUERY_PARAMS_KEY = exports.QUERY_PARAMS_KEY = 'bnd:query-params';
var GEOMETRY_NAME_KEY = exports.GEOMETRY_NAME_KEY = 'bnd:geometry-name';
var MIN_ZOOM_KEY = exports.MIN_ZOOM_KEY = 'bnd:minzoom';
var MAX_ZOOM_KEY = exports.MAX_ZOOM_KEY = 'bnd:maxzoom';
var LEGEND_TYPE = exports.LEGEND_TYPE = 'bnd:legend-type';
var LEGEND_CONTENT = exports.LEGEND_CONTENT = 'bnd:legend-content';

var QUERY_TYPE_WFS = exports.QUERY_TYPE_WFS = 'WFS';

var DEFAULT_ZOOM = exports.DEFAULT_ZOOM = {
  MIN: 0,
  MAX: 22
};

var INTERACTIONS = exports.INTERACTIONS = {
  modify: 'Modify',
  select: 'Select',
  point: 'Point',
  line: 'LineString',
  polygon: 'Polygon',
  box: 'Box',
  measure_point: 'measure:Point',
  measure_line: 'measure:LineString',
  measure_polygon: 'measure:Polygon'
};

// useful for deciding what is or is not a drawing interaction
INTERACTIONS.drawing = [INTERACTIONS.point, INTERACTIONS.line, INTERACTIONS.polygon, INTERACTIONS.box];

// determine which is a measuring interaction
INTERACTIONS.measuring = [INTERACTIONS.measure_point, INTERACTIONS.measure_line, INTERACTIONS.measure_polygon];

/** Export all the const's in a convenient Object.
 */
exports.default = {
  LAYER_VERSION_KEY: LAYER_VERSION_KEY,
  SOURCE_VERSION_KEY: SOURCE_VERSION_KEY,
  TITLE_KEY: TITLE_KEY,
  TIME_KEY: TIME_KEY,
  GROUP_KEY: GROUP_KEY,
  GROUPS_KEY: GROUPS_KEY,
  TIME_START_KEY: TIME_START_KEY,
  TIME_END_KEY: TIME_END_KEY,
  DATA_VERSION_KEY: DATA_VERSION_KEY,
  INTERACTIONS: INTERACTIONS,
  DEFAULT_ZOOM: DEFAULT_ZOOM
};