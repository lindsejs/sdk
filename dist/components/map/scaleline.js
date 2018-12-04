'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScaleLine = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Units = require('ol/proj/Units');

var _proj = require('ol/proj');

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

var DEGREES = 'degrees';
var IMPERIAL = 'imperial';
var NAUTICAL = 'nautical';
var METRIC = 'metric';
var US = 'us';

var LEADING_DIGITS = [1, 2, 5];

/** @module components/map/scaleline
 *
 * @desc Provides a scale line control.
 */

var ScaleLine = exports.ScaleLine = function (_React$Component) {
  _inherits(ScaleLine, _React$Component);

  function ScaleLine() {
    _classCallCheck(this, ScaleLine);

    return _possibleConstructorReturn(this, (ScaleLine.__proto__ || Object.getPrototypeOf(ScaleLine)).apply(this, arguments));
  }

  _createClass(ScaleLine, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      // compare center
      if (this.props.map && nextProps.map && this.props.map.center && nextProps.map.center && (nextProps.map.center[0] !== this.props.map.center[0] || nextProps.map.center[1] !== this.props.map.center[1])) {
        return true;
      }
      // compare resolution
      if (this.props.mapinfo && nextProps.mapinfo && nextProps.mapinfo.resolution !== this.props.mapinfo.resolution) {
        return true;
      }
      // compare units
      if (nextProps.units !== undefined && nextProps.units !== this.props.units) {
        return true;
      }
      return false;
    }
  }, {
    key: 'calculateProperties',
    value: function calculateProperties() {
      var center = (0, _proj.fromLonLat)(this.props.map.center);
      var units = this.props.units;
      var pointResolutionUnits = units === DEGREES ? DEGREES : 'm';
      var projection = (0, _proj.get)(this.props.mapinfo.projection);
      var resolution = this.props.mapinfo.resolution;
      var pointResolution = (0, _proj.getPointResolution)(projection, resolution, center, pointResolutionUnits);
      if (units !== DEGREES) {
        pointResolution *= projection.getMetersPerUnit();
      }
      var nominalCount = this.props.minWidth * pointResolution;
      var suffix = '';
      if (units === DEGREES) {
        var metersPerDegree = _Units.METERS_PER_UNIT[DEGREES];
        if (projection.getUnits() === DEGREES) {
          nominalCount *= metersPerDegree;
        } else {
          pointResolution /= metersPerDegree;
        }
        if (nominalCount < metersPerDegree / 60) {
          suffix = '\u2033'; // seconds
          pointResolution *= 3600;
        } else if (nominalCount < metersPerDegree) {
          suffix = '\u2032'; // minutes
          pointResolution *= 60;
        } else {
          suffix = '\xB0'; // degrees
        }
      } else if (units === IMPERIAL) {
        if (nominalCount < 0.9144) {
          suffix = 'in';
          pointResolution /= 0.0254;
        } else if (nominalCount < 1609.344) {
          suffix = 'ft';
          pointResolution /= 0.3048;
        } else {
          suffix = 'mi';
          pointResolution /= 1609.344;
        }
      } else if (units === NAUTICAL) {
        pointResolution /= 1852;
        suffix = 'nm';
      } else if (units === METRIC) {
        if (nominalCount < 0.001) {
          suffix = 'μm';
          pointResolution *= 1000000;
        } else if (nominalCount < 1) {
          suffix = 'mm';
          pointResolution *= 1000;
        } else if (nominalCount < 1000) {
          suffix = 'm';
        } else {
          suffix = 'km';
          pointResolution /= 1000;
        }
      } else if (units === US) {
        if (nominalCount < 0.9144) {
          suffix = 'in';
          pointResolution *= 39.37;
        } else if (nominalCount < 1609.344) {
          suffix = 'ft';
          pointResolution /= 0.30480061;
        } else {
          suffix = 'mi';
          pointResolution /= 1609.3472;
        }
      }
      return {
        suffix: suffix,
        pointResolution: pointResolution
      };
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.mapinfo && this.props.mapinfo.resolution !== null) {
        var className = 'sdk-scale-line';
        if (this.props.className) {
          className += ' ' + this.props.className;
        }
        var properties = this.calculateProperties();
        var pointResolution = properties.pointResolution;
        var suffix = properties.suffix;
        var i = 3 * Math.floor(Math.log(this.props.minWidth * pointResolution) / Math.log(10));
        var count = void 0,
            width = void 0;
        /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
        while (true) {
          count = LEADING_DIGITS[(i % 3 + 3) % 3] * Math.pow(10, Math.floor(i / 3));
          width = Math.round(count / pointResolution);
          if (isNaN(width)) {
            return false;
          } else if (width >= this.props.minWidth) {
            break;
          }
          i += 1;
        }
        var html = count + ' ' + suffix;
        return _react2.default.createElement(
          'div',
          { style: this.props.style, className: className },
          _react2.default.createElement('div', { className: 'sdk-scale-line-inner', style: { width: width }, dangerouslySetInnerHTML: { __html: html } })
        );
      } else {
        return false;
      }
    }
  }]);

  return ScaleLine;
}(_react2.default.Component);

ScaleLine.propTypes = {
  /**
   * Minimal width in pixels.
   */
  minWidth: _propTypes2.default.number,
  /**
   * The units to use for the scale line.
   */
  units: _propTypes2.default.oneOf([DEGREES, IMPERIAL, NAUTICAL, METRIC, US]),
  /**
   * Css className for the root div.
   */
  className: _propTypes2.default.string,
  /**
   * Style config object for root div.
   */
  style: _propTypes2.default.object
};

ScaleLine.defaultProps = {
  units: METRIC,
  minWidth: 64
};

function mapStateToProps(state) {
  return {
    map: state.map,
    mapinfo: state.mapinfo
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ScaleLine);