'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _reactRedux = require('react-redux');

var _WFS = require('ol/format/WFS');

var _WFS2 = _interopRequireDefault(_WFS);

var _GeoJSON = require('ol/format/GeoJSON');

var _GeoJSON2 = _interopRequireDefault(_GeoJSON);

var _Projection = require('ol/proj/Projection');

var _Projection2 = _interopRequireDefault(_Projection);

var _proj = require('ol/proj');

var _wfs = require('../actions/wfs');

var _util = require('../util');

var _actionTypes = require('../action-types');

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

/** @module components/wfs
 * @desc Provides a component which will respond to WFS updates.
 */
var WfsController = function (_Component) {
  _inherits(WfsController, _Component);

  function WfsController(props) {
    _classCallCheck(this, WfsController);

    var _this = _possibleConstructorReturn(this, (WfsController.__proto__ || Object.getPrototypeOf(WfsController)).call(this, props));

    _this.pendingActions = {};

    _this.wfs_format = new _WFS2.default();

    _this.wfs_proj = new _Projection2.default({
      code: 'http://www.opengis.net/gml/srs/epsg.xml#4326',
      axisOrientation: 'enu'
    });
    (0, _proj.addEquivalentProjections)([(0, _proj.get)('EPSG:4326'), _this.wfs_proj]);
    return _this;
  }

  /** Runs the WFS request.
   * @param {Object} props WfsController component's props.
   * @param {string} id The WFS action to run.
   */


  _createClass(WfsController, [{
    key: 'execute',
    value: function execute(props, id) {
      var _this2 = this;

      // only act if the action is not already pending.
      if (this.pendingActions[id] === undefined) {
        // copy the action
        var action = Object.assign({}, props.actions[id]);

        // add it to the queue
        this.pendingActions[id] = action;

        var src = props.sources[action.sourceName];

        // clone the feature, as GeoJSON features have a lot of
        //  depth this ensures all the sub-objects are cloned reasonably.
        var json_feature = (0, _util.jsonClone)(action.feature);
        delete json_feature.properties['bbox'];

        var geom_name = src.geometryName ? src.geometryName : 'geometry';
        var geojson_format = new _GeoJSON2.default({ geometryName: geom_name });
        var feature = geojson_format.readFeature(json_feature, {
          dataProjection: 'EPSG:4326',
          featureProjection: this.wfs_proj
        });
        // the GeoJSON format will create a feature with a null geometry
        // but to exclude it from the transaction we need undefined
        if (feature.getGeometry() === null) {
          feature.setGeometry(undefined);
        }

        var actions = {};
        actions[action.type] = [feature];

        var options = {
          featureNS: src.featureNS,
          featurePrefix: src.featurePrefix,
          featureType: src.typeName,
          srsName: 'http://www.opengis.net/gml/srs/epsg.xml#4326'
        };

        // convert this to a WFS call.
        var xml = this.wfs_format.writeTransaction(actions[_actionTypes.WFS.INSERT], actions[_actionTypes.WFS.UPDATE], actions[_actionTypes.WFS.DELETE], options);

        // convert the XML to a string.
        var payload = '<?xml version="1.0" encoding="UTF-8"?>' + new XMLSerializer().serializeToString(xml);

        // get the target_url from the service
        var target_url = src.onlineResource;

        // attempt the action,
        var fetchOptions = this.props.fetchOptions;
        fetchOptions.method = 'POST';
        if (!fetchOptions.headers) {
          fetchOptions.headers = new Headers();
        }
        fetchOptions.headers.set('Content-Type', 'text/xml');
        fetchOptions.body = payload;
        this.props.onStartTransaction(action);
        (0, _isomorphicFetch2.default)(target_url, fetchOptions).then(function (response) {
          if (response.ok) {
            return response.text();
          } else {
            throw Error(response.statusText);
          }
        }).then(function (text) {
          return new window.DOMParser().parseFromString(text, 'text/xml');
        }).then(function (data) {
          // A 200 does not necessarily mean the
          //  request was successful.  This attempts to
          //  parse the transaction response and then passes
          //  it to onFinishTransaction. Handling is left to the
          //  user.
          if (data.documentElement.localName === 'ExceptionReport') {
            var exceptionNode = data.getElementsByTagNameNS('http://www.opengis.net/ows', 'ExceptionText');
            throw Error(exceptionNode.item(0).textContent);
          } else {
            var wfs_response = _this2.wfs_format.readTransactionResponse(data);

            // ensure the action is removed from the state
            _this2.props.dispatch((0, _wfs.finishedAction)(id));
            // remove it from the pending actions
            delete _this2.pendingActions[id];

            _this2.props.onFinishTransaction(wfs_response, action);
          }
        }).catch(function (error) {
          // ensure the action is removed from the state
          _this2.props.dispatch((0, _wfs.finishedAction)(id));
          // remove it from the pending actions
          delete _this2.pendingActions[id];
          // let the caller know the request has errored.
          _this2.props.onRequestError(error, action, id);
        });
      }
    }

    /** Loop through the WFS actions in state and run execute() for each.
     * @param {Object} props WfsController component's props.
     */

  }, {
    key: 'executeActions',
    value: function executeActions(props) {
      var action_ids = Object.keys(props.actions);
      for (var i = 0, ii = action_ids.length; i < ii; i++) {
        this.execute(props, action_ids[i]);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      // execute all the actions in the state.
      this.executeActions(nextProps);
      // no update
      return false;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.executeActions(this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      // never render anything.
      return false;
    }
  }]);

  return WfsController;
}(_react.Component);

WfsController.propTypes = {
  /** List of actions that need to be handled by this controller. */
  actions: _propTypes2.default.object,
  /** List of map sources. */
  sources: _propTypes2.default.object,
  /** onStartTransaction callback function, called when the transaction begins. */
  onStartTransaction: _propTypes2.default.func,
  /** onFinishTransaction callback function, called when the transaction has finished. */
  onFinishTransaction: _propTypes2.default.func,
  /** onRequestError callback function, called when a request fails. */
  onRequestError: _propTypes2.default.func,
  /** Options to use for fetch calls */
  fetchOptions: _propTypes2.default.object
};

WfsController.defaultProps = {
  actions: {},
  sources: {},
  onStartTransaction: function onStartTransaction() {},
  onFinishTransaction: function onFinishTransaction() {},
  onRequestError: function onRequestError() {},
  fetchOptions: {
    credentials: 'same-origin'
  }
};

function mapStateToProps(state) {
  return {
    actions: state.wfs.actions,
    sources: state.wfs.sources
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(WfsController);