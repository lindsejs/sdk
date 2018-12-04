'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

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

/** @module components/map/mouseposition
 * @example
 * import SdkMousePosition from '@boundlessgeo/sdk/components/map/mouseposition';
 * import { Provider } from 'react-redux';
 * import SdkMap from '@boundlessgeo/sdk/components/map';
 * import ReactDOM from 'react-dom';
 *
 * ReactDOM.render(<Provider store={store}>
 *   <SdkMap>
 *     <SdkMousePosition />
 *   </SdkMap>
 * </Provider>, document.getElementById('map'));
 *
 * @desc Shows the position of the mouse in geographic coordinates.
 */
var MousePosition = function (_React$Component) {
  _inherits(MousePosition, _React$Component);

  function MousePosition() {
    _classCallCheck(this, MousePosition);

    return _possibleConstructorReturn(this, (MousePosition.__proto__ || Object.getPrototypeOf(MousePosition)).apply(this, arguments));
  }

  _createClass(MousePosition, [{
    key: 'render',
    value: function render() {
      var className = 'sdk-mouseposition';
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      var mouseposition = this.props.mapinfo.mouseposition;
      if (mouseposition.lngLat !== null) {
        var text = this.props.templateFunction(mouseposition);
        return _react2.default.createElement('div', { className: className, style: this.props.style, dangerouslySetInnerHTML: { __html: text } });
      } else {
        return false;
      }
    }
  }]);

  return MousePosition;
}(_react2.default.Component);

MousePosition.propTypes = {
  /**
   * Css className for the root div.
   */
  className: _propTypes2.default.string,
  /**
   * Style config object for root div.
   */
  style: _propTypes2.default.object,
  /**
   * Template function to use for the content. Gets passed the mouseposition object with lngLat and coordinate.
   * Coordinate is the optional coordinate pair in the map projection.
   */
  templateFunction: _propTypes2.default.func
};

MousePosition.defaultProps = {
  templateFunction: function templateFunction(mouseposition) {
    var lng = mouseposition.lngLat.lng.toFixed(2);
    var lat = mouseposition.lngLat.lat.toFixed(2);
    return 'Longitude: ' + lng + '<br/>Latitude: ' + lat;
  }
};

function mapStateToProps(state) {
  return {
    mapinfo: state.mapinfo
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MousePosition);