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

var _map = require('../../actions/map');

var mapActions = _interopRequireWildcard(_map);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

/** @module components/map/zoom-control
 * @example
 * import SdkZoomControl from '@boundlessgeo/sdk/components/map/zoom-control';
 * import { Provider } from 'react-redux';
 * import SdkMap from '@boundlessgeo/sdk/components/map';
 * import ReactDOM from 'react-dom';
 *
 * ReactDOM.render(<Provider store={store}>
 *   <SdkMap>
 *     <SdkZoomControl />
 *   </SdkMap>
 * </Provider>, document.getElementById('map'));
 *
 * @desc Provides 2 buttons to zoom the map (zoom in and out).
 */
var ZoomControl = function (_React$Component) {
  _inherits(ZoomControl, _React$Component);

  function ZoomControl() {
    _classCallCheck(this, ZoomControl);

    return _possibleConstructorReturn(this, (ZoomControl.__proto__ || Object.getPrototypeOf(ZoomControl)).apply(this, arguments));
  }

  _createClass(ZoomControl, [{
    key: 'render',
    value: function render() {
      var className = 'sdk-zoom-control';
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      return _react2.default.createElement(
        'div',
        { className: className, style: this.props.style },
        _react2.default.createElement(
          'button',
          { className: 'sdk-zoom-in', onClick: this.props.zoomIn, title: this.props.zoomInTitle },
          '+'
        ),
        _react2.default.createElement(
          'button',
          { className: 'sdk-zoom-out', onClick: this.props.zoomOut, title: this.props.zoomOutTitle },
          '\u2212'
        )
      );
    }
  }]);

  return ZoomControl;
}(_react2.default.Component);

ZoomControl.propTypes = {
  /**
   * Css className for the root div.
   */
  className: _propTypes2.default.string,
  /**
   * Style config object for root div.
   */
  style: _propTypes2.default.object,
  /**
   * Title for the zoom in button.
   */
  zoomInTitle: _propTypes2.default.string,
  /**
   * Title for the zoom out button.
   */
  zoomOutTitle: _propTypes2.default.string
};

ZoomControl.defaultProps = {
  zoomInTitle: 'Zoom in',
  zoomOutTitle: 'Zoom out'
};

function mapDispatchToProps(dispatch) {
  return {
    zoomIn: function zoomIn() {
      dispatch(mapActions.zoomIn());
    },
    zoomOut: function zoomOut() {
      dispatch(mapActions.zoomOut());
    }
  };
}

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(ZoomControl);