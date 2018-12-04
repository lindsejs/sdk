'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SdkLayerListItemDD = exports.types = exports.layerListItemTarget = exports.layerListItemSource = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.collect = collect;
exports.collectDrop = collectDrop;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDnd = require('react-dnd');

var _util = require('../util');

var _map = require('../actions/map');

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

var layerListItemSource = exports.layerListItemSource = {
  beginDrag: function beginDrag(props) {
    return {
      index: props.index,
      layer: props.layer
    };
  }
};

var layerListItemTarget = exports.layerListItemTarget = {
  drop: function drop(props, monitor, component) {
    var sourceItem = monitor.getItem();
    var dragIndex = sourceItem.index;
    var hoverIndex = props.index;
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }
    // Time to actually perform the action
    var target = props.layers[hoverIndex];
    if (target && sourceItem.layer && sourceItem.layer.id !== target.id) {
      props.dispatch(mapActions.orderLayer(sourceItem.layer.id, target.id));
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  };
}

function collectDrop(connect, monitor) {
  return {
    isOver: monitor.isOver({ shallow: true }),
    connectDropTarget: connect.dropTarget()
  };
}

/** @module components/layer-list-item
 *
 * @desc Provides a layer list item, with a radio button or checkbox for visibility control.
 */

var SdkLayerListItem = function (_React$Component) {
  _inherits(SdkLayerListItem, _React$Component);

  function SdkLayerListItem() {
    _classCallCheck(this, SdkLayerListItem);

    return _possibleConstructorReturn(this, (SdkLayerListItem.__proto__ || Object.getPrototypeOf(SdkLayerListItem)).apply(this, arguments));
  }

  _createClass(SdkLayerListItem, [{
    key: 'moveLayer',
    value: function moveLayer(layerId, targetId) {
      this.props.dispatch(mapActions.orderLayer(layerId, targetId));
    }
  }, {
    key: 'moveLayerUp',
    value: function moveLayerUp() {
      var layer_id = this.props.layer.id;
      var index = (0, _util.getLayerIndexById)(this.props.layers, layer_id);
      if (index < this.props.layers.length - 1) {
        this.moveLayer(layer_id, this.props.layers[index + 1].id);
      }
    }
  }, {
    key: 'moveLayerDown',
    value: function moveLayerDown() {
      var layer_id = this.props.layer.id;
      var index = (0, _util.getLayerIndexById)(this.props.layers, layer_id);
      if (index > 0) {
        this.moveLayer(layer_id, this.props.layers[index - 1].id);
      }
    }
  }, {
    key: 'removeLayer',
    value: function removeLayer() {
      this.props.dispatch(mapActions.removeLayer(this.props.layer.id));
    }
  }, {
    key: 'toggleVisibility',
    value: function toggleVisibility() {
      var shown = (0, _util.isLayerVisible)(this.props.layer);
      if (this.props.exclusive) {
        this.props.dispatch(mapActions.setLayerInGroupVisible(this.props.layer.id, this.props.groupId));
      } else {
        this.props.dispatch(mapActions.setLayerVisibility(this.props.layer.id, shown ? 'none' : 'visible'));
      }
    }
  }, {
    key: 'getVisibilityControl',
    value: function getVisibilityControl() {
      var _this2 = this;

      var layer = this.props.layer;
      var is_checked = (0, _util.isLayerVisible)(layer);
      if (this.props.exclusive) {
        return _react2.default.createElement('input', {
          type: 'radio',
          name: this.props.groupId,
          onChange: function onChange() {
            _this2.toggleVisibility();
          },
          checked: is_checked
        });
      } else {
        return _react2.default.createElement('input', {
          type: 'checkbox',
          onChange: function onChange() {
            _this2.toggleVisibility();
          },
          checked: is_checked
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var layer = this.props.layer;
      var checkbox = this.getVisibilityControl();
      var error_class = this.props.error ? ' sdk-layer-error' : '';
      var markup = _react2.default.createElement(
        'li',
        { className: 'sdk-layer' + error_class, key: layer.id },
        _react2.default.createElement(
          'span',
          { className: 'sdk-checkbox' },
          checkbox
        ),
        _react2.default.createElement(
          'span',
          { className: 'sdk-name' },
          (0, _util.getLayerTitle)(this.props.layer)
        )
      );
      if (this.props.enableDD) {
        return this.props.connectDragSource(this.props.connectDropTarget(markup));
      } else {
        return markup;
      }
    }
  }]);

  return SdkLayerListItem;
}(_react2.default.Component);

exports.default = SdkLayerListItem;


SdkLayerListItem.propTypes = {
  /**
   * Should we enable drag and drop?
   */
  enableDD: _propTypes2.default.bool,
  /**
   * Set of layers which belong to the same group
   */
  groupLayers: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string
  })),
  /**
   * Set of all layers in the map.
   */
  layers: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string
  })).isRequired,
  /**
   * Does this layer belong to an exclusive group? If so render as a radio button group.
   */
  exclusive: _propTypes2.default.bool,
  /**
   * Identifier of the group to which this layer belongs.
   */
  groupId: _propTypes2.default.string,
  /**
   * The layer to use for this item.
   */
  layer: _propTypes2.default.shape({
    /**
     * Identifier of the layer.
     */
    id: _propTypes2.default.string
  }).isRequired,
  /**
   * If the layer's source has an error, display
   *  the layer as "errored".
   */
  error: _propTypes2.default.bool
};

SdkLayerListItem.defaultProps = {
  error: false
};

var types = exports.types = 'layerlistitem';
var SdkLayerListItemDD = exports.SdkLayerListItemDD = (0, _reactDnd.DropTarget)(types, layerListItemTarget, collectDrop)((0, _reactDnd.DragSource)(types, layerListItemSource, collect)(SdkLayerListItem));