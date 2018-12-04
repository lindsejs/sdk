'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fetchJsonp = require('fetch-jsonp');

var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _reactRedux = require('react-redux');

var _View = require('ol/View');

var _View2 = _interopRequireDefault(_View);

var _EsriJSON = require('ol/format/EsriJSON');

var _EsriJSON2 = _interopRequireDefault(_EsriJSON);

var _GeoJSON = require('ol/format/GeoJSON');

var _GeoJSON2 = _interopRequireDefault(_GeoJSON);

var _proj = require('ol/proj');

var _util = require('../util');

var _map = require('../actions/map');

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

/** @module components/esri
 * @desc Provides a component which will handle ArcGIS Rest Feature Service interaction.
 */
var EsriController = function (_Component) {
  _inherits(EsriController, _Component);

  function EsriController(props) {
    _classCallCheck(this, EsriController);

    var _this = _possibleConstructorReturn(this, (EsriController.__proto__ || Object.getPrototypeOf(EsriController)).call(this, props));

    _this.esri_format = new _EsriJSON2.default();
    _this.geojson_format = new _GeoJSON2.default();
    _this.view = new _View2.default();
    return _this;
  }

  _createClass(EsriController, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchData();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.map.center[0] !== this.props.map.center[0] || nextProps.map.center[1] !== this.props.map.center[1] || nextProps.map.zoom !== this.props.map.zoom || nextProps.sources !== this.props.sources) {
        this.fetchData();
      }
      // This should always return false to keep
      // render() from being called.
      return false;
    }
  }, {
    key: 'fetchData',
    value: function fetchData() {
      var _this2 = this;

      this.view.setCenter((0, _proj.fromLonLat)(this.props.map.center));
      this.view.setZoom(this.props.map.zoom + 1);
      var extent = this.view.calculateExtent(this.props.mapinfo.size);

      var _loop = function _loop(key) {
        var source = _this2.props.sources[key];
        var bbox = JSON.stringify({
          xmin: extent[0],
          ymin: extent[1],
          xmax: extent[2],
          ymax: extent[3],
          spatialReference: {
            wkid: 102100
          }
        });
        var params = {
          f: 'json',
          returnGeometry: true,
          spatialRel: 'esriSpatialRelIntersects',
          geometry: bbox,
          geometryType: 'esriGeometryEnvelope',
          inSR: '102100',
          outFields: '*',
          outSR: '4326'
        };
        var url = '' + source.onlineResource + source.featureLayer + '/query/?' + (0, _util.encodeQueryObject)(params);
        (0, _fetchJsonp2.default)(url, { timeout: _this2.props.timeout }).then(function (response) {
          return response.json();
        }).then(function (json) {
          var features = _this2.esri_format.readFeatures(json);
          _this2.props.dispatch((0, _map.updateSource)(key, { data: _this2.geojson_format.writeFeaturesObject(features) }));
        }).catch(function (error) {
          console.error('An error occured.', error);
        });
      };

      for (var key in this.props.sources) {
        _loop(key);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // never render anything.
      return false;
    }
  }]);

  return EsriController;
}(_react.Component);

EsriController.propTypes = {
  /** Request timeout in milliseconds */
  timeout: _propTypes2.default.number,
  /** List of map sources. */
  sources: _propTypes2.default.object
};

EsriController.defaultProps = {
  timeout: 30000,
  sources: {}
};

function mapStateToProps(state) {
  return {
    sources: state.esri.sources,
    map: state.map,
    mapinfo: state.mapinfo
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(EsriController);