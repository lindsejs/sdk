'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HashHistory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _map = require('../actions/map');

var _util = require('../util');

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

/** @module components/history
 * @desc Track the history of the map in the hash.
 *
 */

/** Attempts to parse a given value as a floating point number.
 * @param {*} value The given value to try to parse.
 * @param {number} defaultValue The fallback value to return in case value cannot by parsed as float.
 *
 * @returns {number} Value parsed as a float, or defaultValue,
 */
function proposeFloat(value, defaultValue) {
  var proposed = parseFloat(value);
  if (typeof proposed === 'number' && isFinite(proposed)) {
    return proposed;
  }
  return defaultValue;
}

var HashHistory = exports.HashHistory = function (_React$Component) {
  _inherits(HashHistory, _React$Component);

  function HashHistory(props) {
    _classCallCheck(this, HashHistory);

    // without this, render() will overwrite what is in the URL.
    var _this = _possibleConstructorReturn(this, (HashHistory.__proto__ || Object.getPrototypeOf(HashHistory)).call(this, props));

    _this.onHashChange();
    return _this;
  }

  /** After the component has mounted,
   *  add a listener for the history changes.
   */


  _createClass(HashHistory, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // addEventListener is supported in IE9+
      window.addEventListener('hashchange', function () {
        _this2.onHashChange();
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      // this only listens for the center,zoom, and rotation
      //  to change but props.map contains a lot more data.
      return this.props.map.center[0] !== nextProps.map.center[0] || this.props.map.center[1] !== nextProps.map.center[1] || this.props.map.zoom !== nextProps.map.zoom || this.props.map.rotation !== nextProps.map.rotation;
    }

    /** When the hash changes, attempt to parse a location
     *  from the URL.
     */

  }, {
    key: 'onHashChange',
    value: function onHashChange() {
      // get the hash and remove the leading '#'
      var hash = window.location.hash.substring(1);
      var parsed_hash = (0, _util.parseQueryString)(hash);

      // pass along the now parsed hash to the delegate functions.
      this.parseLocationHash(parsed_hash);
    }

    /** Encode the location in an object appropriate
     *  for hash-encoding.
     *
     *  @returns {Object} An Object with x,y,z members.
     */

  }, {
    key: 'getLocationStateObject',
    value: function getLocationStateObject() {
      return {
        x: this.props.map.center[0].toFixed(5),
        y: this.props.map.center[1].toFixed(5),
        z: this.props.map.zoom,
        r: this.props.map.rotation ? this.props.map.rotation : 0
      };
    }

    /** Create an object which will be encoded in the hash.
     *
     *  This object should represent a limited amount of state
     *  which is appropriate for hash-encoding.
     *
     *  @returns {Object} A new location state object.
     */

  }, {
    key: 'getStateObject',
    value: function getStateObject() {
      return Object.assign({}, this.getLocationStateObject());
    }

    /** Parse the location from the hash.
     *
     *  @param {Object} parsedHash The object resulting from parseQueryString() of the hash.
     *
     */

  }, {
    key: 'parseLocationHash',
    value: function parseLocationHash(parsedHash) {
      // create copies of the current center and zoom
      var center = this.props.map.center;

      var new_center = [proposeFloat(parsedHash.x, center[0]), proposeFloat(parsedHash.y, center[1])];

      var zoom = proposeFloat(parsedHash.z, this.props.map.zoom);

      // change the view.
      this.props.setView(new_center, zoom);
    }

    /** Encode the state for the URL hash.
     *  @returns {string} The encoded url.
     */

  }, {
    key: 'encodeState',
    value: function encodeState() {
      var st = this.getStateObject();
      return (0, _util.encodeQueryObject)(st);
    }
  }, {
    key: 'render',
    value: function render() {
      // set the hash as appropriate.
      window.history.replaceState(null, null, window.location.pathname + ('#' + this.encodeState()));

      // this doesn't actually contribute anything to the DOM!
      return false;
    }
  }]);

  return HashHistory;
}(_react2.default.Component);

HashHistory.propTypes = {
  /** Map state */
  map: _propTypes2.default.shape({
    /** Center of the map. */
    center: _propTypes2.default.arrayOf(_propTypes2.default.number),
    /** Zoom level of the map. */
    zoom: _propTypes2.default.number,
    /** Rotation of the map in degrees. */
    rotation: _propTypes2.default.number
  }),
  /** setView callback function, called when the view needs to change.
   * @ignore
   */
  setView: _propTypes2.default.func
};

HashHistory.defaultProps = {
  map: {
    center: [0, 0],
    zoom: 1,
    rotation: 0
  },
  setView: function setView() {}
};

function mapStateToProps(state) {
  return {
    map: state.map
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setView: function setView(center, zoom) {
      dispatch((0, _map.setView)(center, zoom));
    }
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(HashHistory);