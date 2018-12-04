'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SdkLayerListGroup = exports.SdkList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('../constants');

var _util = require('../util');

var _layerListItem = require('./layer-list-item');

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

var SdkList = exports.SdkList = function (_React$Component) {
  _inherits(SdkList, _React$Component);

  function SdkList() {
    _classCallCheck(this, SdkList);

    return _possibleConstructorReturn(this, (SdkList.__proto__ || Object.getPrototypeOf(SdkList)).apply(this, arguments));
  }

  _createClass(SdkList, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'ul',
        { style: this.props.style, className: this.props.className },
        this.props.children
      );
    }
  }]);

  return SdkList;
}(_react2.default.Component);

SdkList.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node])
};

var SdkLayerListGroup = exports.SdkLayerListGroup = function (_React$Component2) {
  _inherits(SdkLayerListGroup, _React$Component2);

  function SdkLayerListGroup() {
    _classCallCheck(this, SdkLayerListGroup);

    return _possibleConstructorReturn(this, (SdkLayerListGroup.__proto__ || Object.getPrototypeOf(SdkLayerListGroup)).apply(this, arguments));
  }

  _createClass(SdkLayerListGroup, [{
    key: 'render',
    value: function render() {
      var children = [];
      for (var i = 0, ii = this.props.childLayers.length; i < ii; i++) {
        children.push(_react2.default.createElement(this.props.layerClass, {
          enableDD: this.props.enableDD,
          exclusive: this.props.group.exclusive,
          key: i,
          index: (0, _util.getLayerIndexById)(this.props.layers, this.props.childLayers[i].id),
          groupLayers: this.props.childLayers,
          layers: this.props.layers,
          layer: this.props.childLayers[i],
          groupId: this.props.groupId,
          error: this.props.error
        }));
      }

      var errors = this.props.error ? ' sdk-layer-error' : '';

      return _react2.default.createElement(
        'li',
        { className: 'sdk-layer-group' + errors },
        this.props.group.name,
        _react2.default.createElement(
          'ul',
          null,
          children
        )
      );
    }
  }]);

  return SdkLayerListGroup;
}(_react2.default.Component);

SdkLayerListGroup.propTypes = {
  enableDD: _propTypes2.default.bool,
  groupId: _propTypes2.default.string.isRequired,
  group: _propTypes2.default.shape({
    name: _propTypes2.default.string,
    exclusive: _propTypes2.default.bool
  }).isRequired,
  layerClass: _propTypes2.default.func.isRequired,
  childLayers: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string
  })).isRequired,
  layers: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string
  })).isRequired
};

/** @module components/layer-list
 *
 * @desc Provides a layer list control.
 */

var SdkLayerList = function (_React$Component3) {
  _inherits(SdkLayerList, _React$Component3);

  function SdkLayerList(props) {
    _classCallCheck(this, SdkLayerList);

    var _this3 = _possibleConstructorReturn(this, (SdkLayerList.__proto__ || Object.getPrototypeOf(SdkLayerList)).call(this, props));

    _this3.groupClass = (0, _reactRedux.connect)()(_this3.props.groupClass);
    _this3.layerClass = (0, _reactRedux.connect)()(_this3.props.layerClass);
    return _this3;
  }

  _createClass(SdkLayerList, [{
    key: 'addGroup',
    value: function addGroup(layers, groupName, groups, group_layers) {
      // show an error if any of the layers in the group have an error.
      var has_error = false;
      for (var i = 0, ii = group_layers.length; i < ii; i++) {
        has_error = has_error || (0, _util.hasSourceError)(group_layers[i], this.props.sourceErrors);
      }

      var group_props = Object.assign({}, this.props.groupProps, {
        enableDD: this.props.enableDD,
        key: groupName,
        groupId: groupName,
        group: groups[groupName],
        childLayers: group_layers,
        layers: this.props.layers,
        layerClass: this.layerClass,
        error: has_error
      });

      layers.unshift(_react2.default.createElement(this.groupClass, group_props));
    }
  }, {
    key: 'handlePendingGroup',
    value: function handlePendingGroup(layers, group_layers, groupName, groups) {
      if (group_layers && group_layers.length) {
        this.addGroup(layers, groupName, groups, group_layers);
        // reset group_layers
        group_layers = [];
      }
      return group_layers;
    }
  }, {
    key: 'render',
    value: function render() {
      var className = 'sdk-layer-list';
      if (this.props.className) {
        className = className + ' ' + this.props.className;
      }
      var layers = [];
      var groups = this.props.metadata ? this.props.metadata[_constants.GROUPS_KEY] : undefined;
      var groupName = void 0,
          group_layers = void 0;
      for (var i = 0, ii = this.props.layers.length; i < ii; i++) {
        var item = this.props.layers[i];
        if (item.metadata && item.metadata[_constants.GROUP_KEY]) {
          if (groupName !== item.metadata[_constants.GROUP_KEY]) {
            if (group_layers && group_layers.length > 0) {
              this.addGroup(layers, groupName, groups, group_layers);
            }
            group_layers = [];
          }
          groupName = item.metadata[_constants.GROUP_KEY];
          if (group_layers && item.metadata[_constants.LAYERLIST_HIDE_KEY] !== true) {
            group_layers.unshift(item);
          }
        } else if (!item.metadata || item.metadata[_constants.LAYERLIST_HIDE_KEY] !== true) {
          group_layers = this.handlePendingGroup(layers, group_layers, groupName, groups);
          layers.unshift(_react2.default.createElement(this.layerClass, {
            enableDD: this.props.enableDD,
            index: i,
            key: i,
            layers: this.props.layers,
            layer: item,
            error: (0, _util.hasSourceError)(item, this.props.sourceErrors)
          }));
        }
      }
      this.handlePendingGroup(layers, group_layers, groupName, groups);
      return _react2.default.createElement(
        this.props.listClass,
        { style: this.props.style, className: className },
        layers
      );
    }
  }]);

  return SdkLayerList;
}(_react2.default.Component);

SdkLayerList.propTypes = {
  /**
   * Should we enable drag and drop for reordering?
   */
  enableDD: _propTypes2.default.bool,
  /**
   * React.Component to use for rendering layer groups.
   */
  groupClass: _propTypes2.default.func,
  /**
   * React.Component to use for rendering layers.
   */
  layerClass: _propTypes2.default.func,
  /**
   * React.Component to use for rendering lists. The default implementation uses <ul>.
   */
  listClass: _propTypes2.default.func,
  /**
   * List of layers to use.
   */
  layers: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string
  })).isRequired,
  /**
   * Style config object for the root element.
   */
  style: _propTypes2.default.object,
  /**
   * Css className for the root element.
   */
  className: _propTypes2.default.string,
  /**
   * Additional props for Groups in the list
   */
  groupProps: _propTypes2.default.object
};

SdkLayerList.defaultProps = {
  enableDD: true,
  layerClass: _layerListItem.SdkLayerListItemDD,
  groupClass: SdkLayerListGroup,
  listClass: SdkList,
  groupProps: {}
};

function mapStateToProps(state) {
  return {
    layers: state.map.layers,
    metadata: state.map.metadata,
    sourceErrors: state.mapinfo ? state.mapinfo.sourceErrors : {}
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SdkLayerList);