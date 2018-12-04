'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRender = MapRender;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
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

function MapRender() {
  var _this = this;

  var className = 'sdk-map';
  if (this.props.className) {
    className = className + ' ' + this.props.className;
  }
  return _react2.default.createElement(
    'div',
    { style: this.props.style, ref: function ref(c) {
        _this.mapdiv = c;
      }, className: className },
    _react2.default.createElement(
      'div',
      { className: 'controls' },
      this.props.children
    )
  );
}

/**
 * @module components/map-common
 * @ignore
 */

var MapCommon = function (_React$Component) {
  _inherits(MapCommon, _React$Component);

  function MapCommon() {
    _classCallCheck(this, MapCommon);

    return _possibleConstructorReturn(this, (MapCommon.__proto__ || Object.getPrototypeOf(MapCommon)).apply(this, arguments));
  }

  return MapCommon;
}(_react2.default.Component);

exports.default = MapCommon;


MapCommon.propTypes = {
  /** Should we wrap the world? If yes, data will be repeated in all worlds. */
  wrapX: _propTypes2.default.bool,
  /** Should we handle map hover to show mouseposition? */
  hover: _propTypes2.default.bool,
  /** Projection of the map, normally an EPSG code. */
  projection: _propTypes2.default.string,
  /** Map configuration, modelled after the Mapbox Style specification. */
  map: _propTypes2.default.shape({
    /** Center of the map. */
    center: _propTypes2.default.array,
    /** Zoom level of the map. */
    zoom: _propTypes2.default.number,
    /** Rotation of the map in degrees. */
    bearing: _propTypes2.default.number,
    /** Extra information about the map. */
    metadata: _propTypes2.default.object,
    /** List of map layers. */
    layers: _propTypes2.default.array,
    /** List of layer sources. */
    sources: _propTypes2.default.object,
    /** Sprite sheet to use. */
    sprite: _propTypes2.default.string
  }),
  /** Child components. */
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  /** Mapbox specific configuration. */
  mapbox: _propTypes2.default.shape({
    /** Base url to use for mapbox:// substitutions. */
    baseUrl: _propTypes2.default.string,
    /** Access token for the Mapbox account to use. */
    accessToken: _propTypes2.default.string
  }),
  /** Style configuration object. */
  style: _propTypes2.default.object,
  /** Css className. */
  className: _propTypes2.default.string,
  /** Drawing specific configuration. */
  drawing: _propTypes2.default.shape({
    /** Current interaction to use for drawing. */
    interaction: _propTypes2.default.string,
    /** Current source name to use for drawing. */
    sourceName: _propTypes2.default.string
  }),
  /** Initial popups to display in the map. */
  initialPopups: _propTypes2.default.arrayOf(_propTypes2.default.object),
  /** setView callback function, triggered on moveend.
   * @ignore
   */
  setView: _propTypes2.default.func,
  /** setSize callback function, triggered on change size.
   * @ignore
   */
  setSize: _propTypes2.default.func,
  /** setMousePosition callback function, triggered on pointermove.
   * @ignore
   */
  setMousePosition: _propTypes2.default.func,
  /** setProjection callback function.
   * @ignore
   */
  setProjection: _propTypes2.default.func,
  /** Should we include features when the map is clicked? */
  includeFeaturesOnClick: _propTypes2.default.bool,
  /** onClick callback function, triggered on singleclick. */
  onClick: _propTypes2.default.func,
  /** onFeatureDrawn callback, triggered on drawend of the draw interaction. */
  onFeatureDrawn: _propTypes2.default.func,
  /** onFeatureModified callback, triggered on modifyend of the modify interaction. */
  onFeatureModified: _propTypes2.default.func,
  /** setMeasureGeometry callback, called when the measure geometry changes.
   * @ignore
   */
  setMeasureGeometry: _propTypes2.default.func,
  /** clearMeasureFeature callback, called when the measure feature is cleared.
   * @ignore
   */
  clearMeasureFeature: _propTypes2.default.func,
  /**
   * Should we be interactive? I.e. respond to mouse and keyboard events?
   */
  interactive: _propTypes2.default.bool
};

MapCommon.defaultProps = {
  wrapX: true,
  hover: true,
  projection: 'EPSG:3857',
  map: {
    center: [0, 0],
    zoom: 2,
    bearing: 0,
    metadata: {},
    layers: [],
    sources: {},
    sprite: undefined
  },
  drawing: {
    interaction: null,
    source: null
  },
  mapbox: {
    baseUrl: '',
    accessToken: ''
  },
  initialPopups: [],
  setView: function setView() {
    // swallow event.
  },
  setSize: function setSize() {},
  setMousePosition: function setMousePosition() {
    // swallow event.
  },
  setProjection: function setProjection() {},
  includeFeaturesOnClick: false,
  onClick: function onClick() {},
  onFeatureDrawn: function onFeatureDrawn() {},
  onFeatureModified: function onFeatureModified() {},
  setMeasureGeometry: function setMeasureGeometry() {},
  clearMeasureFeature: function clearMeasureFeature() {},
  interactive: true
};