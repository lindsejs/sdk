'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Legend = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getLegend = getLegend;
exports.getPointGeometry = getPointGeometry;
exports.getLineGeometry = getLineGeometry;
exports.getPolygonGeometry = getPolygonGeometry;
exports.getRasterLegend = getRasterLegend;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _render = require('ol/render');

var _LineString = require('ol/geom/LineString');

var _LineString2 = _interopRequireDefault(_LineString);

var _Polygon = require('ol/geom/Polygon');

var _Polygon2 = _interopRequireDefault(_Polygon);

var _Point = require('ol/geom/Point');

var _Point2 = _interopRequireDefault(_Point);

var _Feature = require('ol/Feature');

var _Feature2 = _interopRequireDefault(_Feature);

var _Vector = require('ol/layer/Vector');

var _Vector2 = _interopRequireDefault(_Vector);

var _olMapboxStyle = require('ol-mapbox-style');

var _util = require('../util');

var _constants = require('../constants');

var _map = require('./map');

var _asyncImg = require('./async-img');

var _asyncImg2 = _interopRequireDefault(_asyncImg);

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

/** @module components/legend
 * @desc React Component to render the legend data.
 * Create legend objects using the metadata prefixes
 *  "bnd:legend-type" and "bnd:legend-contents".
 *  Neither the Mapbox GL Spec nor the specific underlying
 *  services for vector layers have a standardized way of
 *  providing legends.  This is using the metadata provided
 *  by the layer to do so.
 *  "bnd:legend-type" can be one of "image", "html", "href"
 *  where "bnd:legend-content" would then provide the appropriate
 *  additional information.
 *  "bnd:legend-type" : "image", "bnd:legend-content" would provide
 *   the src attribute for an <img>
 *  "bnd:legend-type" : "html", "bnd:legend-content" would provide
 *   the html content for a <div>
 *  "bnd:legend-type" : "href", "bnd:legend-content" would provide
 *   the URL for html content.
 */

/** Return a div that is asynchronously populated
 *  with the content from the parameter href.
 *
 *  @param {string} href The location of the content for the div.
 *
 *  @returns {Object} A <div> element.
 */
function getRemoteLegend(href) {
  var _ref = null;
  var div = _react2.default.createElement('div', { ref: function ref(me) {
      _ref = me;
    } });

  // kick off the href fun!
  (0, _isomorphicFetch2.default)(href).then(function (response) {
    return response.text();
  }).then(function (html) {
    // This is equivalent to dangerouslySetInnerHTML
    if (_ref !== null) {
      _ref.innerHTML = html;
    }
  }).catch(function (error) {
    console.error('An error occured.', error);
  });

  return div;
}

/**
 *   @param {Object} layer Mapbox GL layer.
 *
 *   @returns {(Object|null)} A <div> or <img> element, or null.
 */
function getLegend(layer) {
  if (layer.metadata === undefined) {
    return null;
  }
  var content = layer.metadata[_constants.LEGEND_CONTENT];

  switch (layer.metadata[_constants.LEGEND_TYPE]) {
    case 'image':
      return _react2.default.createElement('img', { alt: layer.id, src: content });
    case 'html':
      // eslint-disable-next-line
      return _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: content } });
    case 'href':
      return getRemoteLegend(content);
    default:
      // no legend provided.
      return null;
  }
}

var pointGeomCache = {};
function getPointGeometry(size) {
  if (!pointGeomCache[size]) {
    pointGeomCache[size] = new _Point2.default([size[0] / 2, size[1] / 2]);
  }
  return pointGeomCache[size];
}

var lineGeomCache = {};
function getLineGeometry(size) {
  if (!lineGeomCache[size]) {
    var center = [size[0] / 2, size[1] / 2];
    lineGeomCache[size] = new _LineString2.default([[-8 + center[0], -3 + center[1]], [-3 + center[0], 3 + center[1]], [3 + center[0], -3 + center[1]], [8 + center[0], 3 + center[1]]]);
  }
  return lineGeomCache[size];
}

var polygonGeomCache = {};
function getPolygonGeometry(size) {
  if (!polygonGeomCache[size]) {
    var center = [size[0] / 2, size[1] / 2];
    polygonGeomCache[size] = new _Polygon2.default([[[-8 + center[0], -4 + center[1]], [-6 + center[0], -6 + center[1]], [6 + center[0], -6 + center[1]], [8 + center[0], -4 + center[1]], [8 + center[0], 4 + center[1]], [6 + center[0], 6 + center[1]], [-6 + center[0], 6 + center[1]], [-8 + center[0], 4 + center[1]]]]);
  }
  return polygonGeomCache[size];
}

/** Get the legend for a raster-type layer.
 *  Attempts to detect a WMS-type source and use GetLegendGraphic,
 *  otherwise, uses SDK specified legend metadata.
 *
 *  @param {Object} layer Mapbox GL layer object.
 *  @param {Object} layer_src Mapbox GL source object.
 *  @param {boolean} async Should we fetch async?
 *  @param {Object} fetchOptions Options to use for fetch call if async.
 *
 *  @returns {(Object[]|Object)} An array of <img> elements or a <div> element.
 */
function getRasterLegend(layer, layer_src, async, fetchOptions) {
  if (layer_src.tiles && layer_src.tiles.length > 0) {
    var tile_url = layer_src.tiles[0];
    // check to see if the url is a wms request.
    if (tile_url.toUpperCase().indexOf('SERVICE=WMS') >= 0) {
      var tile_url_parts = tile_url.split('?');
      // parse the url
      var wms_params = (0, _util.parseQueryString)(tile_url_parts[1]);

      // normalize the keys: WMS requests are sometimes allcaps,
      //  sometimes lower cased, and sometimes (evilly so) mixed case.
      var wms_keys = Object.keys(wms_params);
      for (var i = 0, ii = wms_keys.length; i < ii; i++) {
        var key = wms_keys[i];
        var uc_key = key.toUpperCase();
        wms_params[uc_key] = wms_params[key];
      }

      // get the WMS servers URL.
      var url = tile_url_parts[0];

      // REQUEST, FORMAT, and LAYER are the three required GetLegendGraphic
      // parameters.  LAYER is populated after the optional keys are added.
      var legend_params = {
        SERVICE: 'WMS',
        REQUEST: 'GetLegendGraphic',
        FORMAT: wms_params.FORMAT
      };

      // These are optional parameters and will not be found in
      // every WMS request. This checks for the parameter before
      // adding it in.
      // WIDTH and HEIGHT are omitted as they provide a
      // hint for the LEGEND size not the underlaying map size.
      var optional_keys = ['STYLE', 'FEATURETYPE', 'RULE', 'SCALE', 'SLD', 'SLD_BODY', 'EXCEPTIONS', 'LANGUAGE'];

      for (var _i = 0, _ii = optional_keys.length; _i < _ii; _i++) {
        var value = wms_params[optional_keys[_i]];
        if (value !== undefined) {
          legend_params[optional_keys[_i]] = value;
        }
      }

      // Build the stack of URLs for each layer. Unlike GetMap,
      // each layer needs a separate call.
      var images = [];
      var layers = wms_params.LAYERS.split(',');
      for (var _i2 = 0, _ii2 = layers.length; _i2 < _ii2; _i2++) {
        var params = Object.assign({}, legend_params, {
          LAYER: layers[_i2]
        });
        var src = url + '?' + (0, _util.encodeQueryObject)(params);
        images.push(_react2.default.createElement(_asyncImg2.default, { async: async, fetchOptions: fetchOptions, alt: layers[_i2], key: layers[_i2], className: 'sdk-legend-image', src: src }));
      }

      return images;
    }
  }

  return getLegend(layer);
}

var Legend = exports.Legend = function (_React$Component) {
  _inherits(Legend, _React$Component);

  function Legend(props) {
    _classCallCheck(this, Legend);

    var _this = _possibleConstructorReturn(this, (Legend.__proto__ || Object.getPrototypeOf(Legend)).call(this, props));

    _this.state = {
      empty: false
    };
    return _this;
  }

  _createClass(Legend, [{
    key: 'layersEqual',
    value: function layersEqual(layer1, layer2) {
      var paintEqual = true;
      if (layer1 && layer1.paint && layer2 && layer2.paint) {
        paintEqual = (0, _util.jsonEquals)(layer1.paint, layer2.paint);
      }
      var layoutEqual = true;
      if (layer1 && layer1.layout && layer2 && layer2.layout) {
        var layout1 = Object.assign({}, layer1.layout);
        var layout2 = Object.assign({}, layer2.layout);
        delete layout1.visibility;
        delete layout2.visibility;
        layoutEqual = (0, _util.jsonEquals)(layout1, layout2);
      }
      return paintEqual && layoutEqual;
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var nextLayer = (0, _util.getLayerById)(nextProps.layers, this.props.layerId);
      var layer = (0, _util.getLayerById)(this.props.layers, this.props.layerId);
      var layerEqual = this.layersEqual(nextLayer, layer);
      var strokeEqual = true;
      if (this.props.strokeId) {
        var nextStrokeLayer = (0, _util.getLayerById)(nextProps.layers, this.props.strokeId);
        var strokeLayer = (0, _util.getLayerById)(this.props.layers, this.props.strokeId);
        strokeEqual = this.layersEqual(nextStrokeLayer, strokeLayer);
      }
      return !layerEqual || !strokeEqual;
    }
  }, {
    key: 'getVectorLegend',
    value: function getVectorLegend(layers, layer_src) {
      var _this2 = this;

      var props = this.props;
      var layer = layers[0];
      if (!layer.metadata || !layer.metadata[_constants.LEGEND_TYPE]) {
        var size = props.size;
        return _react2.default.createElement('canvas', { ref: function ref(c) {
            if (c !== null) {
              var vectorContext = (0, _render.toContext)(c.getContext('2d'), { size: size });
              var sources = {};
              sources[layer.source] = layer_src;
              var fake_style = (0, _map.getFakeStyle)(props.sprite, layers, sources, props.mapbox.baseUrl, props.mapbox.accessToken);
              var olLayer = new _Vector2.default();
              var me = _this2;

              var onApplyStyle = function onApplyStyle() {
                var styleFn = olLayer.getStyle();
                var geom = void 0;
                if (layer.type === 'symbol' || layer.type === 'circle') {
                  geom = getPointGeometry(size);
                } else if (layer.type === 'line') {
                  geom = getLineGeometry(size);
                } else if (layer.type === 'fill') {
                  geom = getPolygonGeometry(size);
                }
                if (geom) {
                  var properties = {};
                  if (layer['source-layer']) {
                    properties.layer = layer['source-layer'];
                  }
                  var feature = new _Feature2.default(properties);
                  feature.setGeometry(geom);
                  var styles = styleFn(feature);
                  if (styles) {
                    for (var i = 0, ii = styles.length; i < ii; ++i) {
                      vectorContext.setStyle(styles[i]);
                      vectorContext.drawGeometry(geom);
                    }
                  } else {
                    me.setState({ empty: true });
                  }
                }
              };

              (0, _olMapboxStyle.applyStyle)(olLayer, fake_style, layer.source).then(function () {
                if (!(layer.layout && layer.layout['icon-image'])) {
                  onApplyStyle();
                } else {
                  olLayer.once('change', function () {
                    onApplyStyle();
                  });
                }
              }).catch(function (error) {
                console.error('An error occurred.', error);
              });
            }
          } });
      } else {
        return getLegend(layer);
      }
    }
  }, {
    key: 'transformVectorLayer',
    value: function transformVectorLayer(layer) {
      var result = layer;
      if (layer.ref) {
        result = (0, _map.hydrateLayer)(this.props.layers, layer);
      }
      if (result.filter || result.layout && result.layout.visibility === 'none') {
        result = (0, _util.jsonClone)(result);
        delete result.filter;
        if (result.layout) {
          delete result.layout.visibility;
        }
      }
      return result;
    }

    /** Handles how to get the legend data based on the layer source type.
     *  @returns {Object} Call to getRasterLegend() or getLegend() to return the html element.
     */

  }, {
    key: 'getLegendContents',
    value: function getLegendContents() {
      // get the layer definition
      var layer = (0, _util.getLayerById)(this.props.layers, this.props.layerId);
      if (layer === null) {
        return null;
      }

      var source_name = layer.source;
      if (layer.ref && !layer.source) {
        var ref_layer = (0, _util.getLayerById)(this.props.layers, layer.ref);
        source_name = ref_layer.source;
      }
      var layer_src = this.props.sources[source_name];

      if (!layer_src) {
        return null;
      }

      if (layer.metadata && layer.metadata[_constants.LEGEND_TYPE] && layer.metadata[_constants.LEGEND_CONTENT]) {
        return getLegend(layer);
      }

      switch (layer_src.type) {
        case 'raster':
          return getRasterLegend(layer, layer_src, this.props.async, this.props.fetchOptions);
        // while this may seem pretty verbose,
        //  it was intentionally left here to make it
        //  easy to implement other legend handlers as
        //  is deemed appropriate.
        case 'vector':
        case 'geojson':
          var layers = [this.transformVectorLayer(layer)];
          if (this.props.strokeId) {
            var strokeLayer = (0, _util.getLayerById)(this.props.layers, this.props.strokeId);
            if (strokeLayer !== null) {
              layers.push(this.transformVectorLayer(strokeLayer));
            }
          }
          return this.getVectorLegend(layers, layer_src);
        case 'image':
        case 'video':
        case 'canvas':
        default:
          return getLegend(layer);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var legend_contents = void 0;
      if (this.state.empty) {
        legend_contents = this.props.emptyLegendMessage;
      } else {
        legend_contents = this.getLegendContents();
        if (legend_contents === null) {
          legend_contents = this.props.emptyLegendMessage;
        }
      }
      var className = 'sdk-legend';
      if (this.props.className) {
        className = className + ' ' + this.props.className;
      }

      return _react2.default.createElement(
        'div',
        { style: this.props.style, className: className },
        legend_contents
      );
    }
  }]);

  return Legend;
}(_react2.default.Component);

Legend.propTypes = {
  /** The id of the layer for which this legend is meant. */
  layerId: _propTypes2.default.string.isRequired,
  /**
   * Id of the layer that should serve as the stroke of a polygon legend swatch.
   * Only useful for vector legends that have a separate layer for fill and stroke.
   */
  strokeId: _propTypes2.default.string,
  /** List of layers from the store. */
  layers: _propTypes2.default.arrayOf(_propTypes2.default.object),
  /** List of layer sources. */
  sources: _propTypes2.default.shape({
    /** Source to associate with the layer. */
    source: _propTypes2.default.string
  }),
  /** Mapbox specific configuration. */
  mapbox: _propTypes2.default.shape({
    /** Base url to use when substituting mapbox:// type urls. */
    baseUrl: _propTypes2.default.string,
    /** Access token of the mapbox account to use. */
    accessToken: _propTypes2.default.string
  }),
  /** Sprite sheet url. */
  sprite: _propTypes2.default.string,
  /** If legend is empty, show this message. */
  emptyLegendMessage: _propTypes2.default.string,
  /** Size of the legend, only used for vector legends. */
  size: _propTypes2.default.arrayOf(_propTypes2.default.number),
  /** Style config object. */
  style: _propTypes2.default.object,
  /** Css classname to apply. */
  className: _propTypes2.default.string,
  /** Do we need to fetch the WMS GetLegendGraphic images asynchronous? */
  async: _propTypes2.default.bool,
  /** Options to use for fetch calls if async is true */
  fetchOptions: _propTypes2.default.object
};

Legend.defaultProps = {
  size: [50, 50],
  mapbox: {
    baseUrl: '',
    accessToken: ''
  },
  layers: [],
  sources: {},
  emptyLegendMessage: undefined
};

function mapStateToProps(state) {
  return {
    sprite: state.map.sprite,
    layers: state.map.layers,
    sources: state.map.sources,
    mapbox: state.mapbox
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Legend);