'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapboxGL = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
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

exports.getMapExtent = getMapExtent;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _reactRedux = require('react-redux');

var _map = require('../actions/map');

var _mapinfo = require('../actions/mapinfo');

var _util = require('../util');

var _mapCommon = require('./map-common');

var _mapCommon2 = _interopRequireDefault(_mapCommon);

var _mapboxGlDraw = require('@mapbox/mapbox-gl-draw');

var _mapboxGlDraw2 = _interopRequireDefault(_mapboxGlDraw);

var _map2 = require('../reducers/map');

var _constants = require('../constants');

var _area = require('@turf/area');

var _area2 = _interopRequireDefault(_area);

var _distance = require('@turf/distance');

var _distance2 = _interopRequireDefault(_distance);

var _drawing = require('../actions/drawing');

require('mapbox-gl/dist/mapbox-gl.css');

var _mapboxGlDrawStaticMode = require('@mapbox/mapbox-gl-draw-static-mode');

var _mapboxGlDrawStaticMode2 = _interopRequireDefault(_mapboxGlDrawStaticMode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isBrowser = !((typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' && String(process) === '[object process]' && !process.browser);

var mapboxgl = isBrowser ? require('mapbox-gl') : null;

var SIMPLE_SELECT_MODE = 'simple_select';
var DIRECT_SELECT_MODE = 'direct_select';
var STATIC_MODE = 'static';

/** @module components/mapboxgl
 *
 * @desc Provide a Mapbox GL map which reflects the
 *       state of the Redux store.
 */

/** This variant of getVersion() differs as it allows
 *  for undefined values to be returned.
 * @param {Object} obj The state.map object
 * @param {Object} obj.metadata The state.map.metadata object
 * @param {string} key One of 'bnd:layer-version', 'bnd:source-version', or 'bnd:data-version'.
 *
 * @returns {(number|undefined)} The version number of the given metadata key.
 */
function getVersion(obj, key) {
  if (obj.metadata === undefined) {
    return undefined;
  }
  return obj.metadata[key];
}

/** MapboxGL based renderer class.
 */

var MapboxGL = function (_React$Component) {
  _inherits(MapboxGL, _React$Component);

  function MapboxGL(props) {
    _classCallCheck(this, MapboxGL);

    var _this = _possibleConstructorReturn(this, (MapboxGL.__proto__ || Object.getPrototypeOf(MapboxGL)).call(this, props));

    _this.onMapLoad = _this.onMapLoad.bind(_this);
    _this.sourcesVersion = null;
    _this.layersVersion = null;

    // popups and their elements are stored as an ID managed hash.
    _this.popups = {};
    _this.elems = {};
    _this.overlays = [];

    _this.draw = null;
    _this.drawMode = _mapboxGlDrawStaticMode2.default;
    _this.currentMode = STATIC_MODE;
    _this.afterMode = STATIC_MODE;

    // interactions are how the user can manipulate the map,
    //  this tracks any active interaction.
    _this.activeInteractions = null;

    _this.render = _mapCommon.MapRender.bind(_this);
    return _this;
  }

  _createClass(MapboxGL, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // put the map into the DOM
      this.configureMap();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.map) {
        this.map.remove();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.drawing && this.props.drawing.interaction) {
        this.addDrawIfNeeded();
      }
      // check if the sources or layers diff
      var next_sources_version = getVersion(this.props.map, _constants.SOURCE_VERSION_KEY);
      var next_layer_version = getVersion(this.props.map, _constants.LAYER_VERSION_KEY);
      if (this.sourcesVersion !== next_sources_version || this.layersVersion !== next_layer_version) {
        this.sourcesVersion = next_sources_version;
        this.layersVersion = next_layer_version;
        this.map && this.map.setStyle(this.props.map);
      }
      // compare the centers
      if (this.props.map.center !== undefined) {
        // center has not been set yet or differs
        if (prevProps.map.center === undefined || this.props.map.center[0] !== prevProps.map.center[0] || this.props.map.center[1] !== prevProps.map.center[1]) {
          this.map && this.map.setCenter(this.props.map.center);
        }
      }
      // compare the zoom
      if (this.props.map.zoom !== undefined && this.props.map.zoom !== prevProps.map.zoom && this.map) {
        this.map.setZoom(this.props.map.zoom);
      }
      // compare the rotation
      if (this.props.map.bearing !== undefined && this.props.map.bearing !== prevProps.map.bearing && this.map) {
        this.map.setBearing(this.props.map.bearing);
      }
      // check the vector sources for data changes
      var src_names = Object.keys(this.props.map.sources);
      for (var i = 0, ii = src_names.length; i < ii; i++) {
        var src_name = src_names[i];
        var src = prevProps.map.sources[src_name];
        if (src && src.type === 'geojson') {
          var version_key = (0, _map2.dataVersionKey)(src_name);
          if (prevProps.map.metadata !== undefined && prevProps.map.metadata[version_key] !== this.props.map.metadata[version_key] && this.map) {
            var source = this.map.getSource(src_name);
            if (source !== undefined) {
              source.setData(this.props.map.sources[src_name].data);
            }
          }
        }
      }
      // trigger a resize event when the size has changed or a redraw is requested.
      if (!(0, _util.optionalEquals)(this.props, prevProps, 'mapinfo', 'size') || !(0, _util.optionalEquals)(this.props, prevProps, 'mapinfo', 'requestedRedraws')) {
        this.map.resize();
      }

      // change the current interaction as needed
      if (this.props.drawing && (this.props.drawing.interaction !== prevProps.drawing.interaction || this.props.drawing.sourceName !== prevProps.drawing.sourceName)) {
        this.updateInteraction(this.props.drawing);
      }
    }
  }, {
    key: 'onMapClick',
    value: function onMapClick(e) {
      var bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
      var features = this.map.queryRenderedFeatures(bbox);
      var features_promise = new Promise(function (resolve) {
        var features_by_layer = {};
        for (var i = 0, ii = features.length; i < ii; ++i) {
          var layer_name = features[i].layer.id;
          if (!features_by_layer[layer_name]) {
            features_by_layer[layer_name] = [];
          }
          features_by_layer[layer_name] = features[i];
        }
        resolve([features_by_layer]);
      });
      // no xy and hms properties here
      var coordinate = {
        0: e.lngLat.lng,
        1: e.lngLat.lat
      };
      this.props.onClick(this, coordinate, features_promise);
    }
  }, {
    key: 'onMapMoveEnd',
    value: function onMapMoveEnd() {
      var center = this.map.getCenter().toArray();
      var bearing = this.map.getBearing();
      var zoom = this.map.getZoom();

      var view = {
        center: center,
        zoom: zoom,
        bearing: bearing,
        extent: getMapExtent(this.map),
        resolution: (0, _util.getResolutionForZoom)(zoom, this.props.projection)
      };

      this.props.setView(view);
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      this.props.setMousePosition(e.lngLat);
    }
  }, {
    key: 'onMapLoad',
    value: function onMapLoad() {
      // add the initial popups from the user.
      for (var i = 0, ii = this.props.initialPopups.length; i < ii; i++) {
        this.addPopup(this.props.initialPopups[i]);
      }
      this.updatePopups();
      this.map.off('click', this.onMapLoad);
    }
  }, {
    key: 'addDrawIfNeeded',
    value: function addDrawIfNeeded() {
      if (!this.draw) {
        var modes = _mapboxGlDraw2.default.modes;
        if (this.props.drawingModes && this.props.drawingModes.length > 0) {
          this.props.drawingModes.forEach(function (mode) {
            modes[mode.name] = mode.mode;
          });
        }
        modes.static = _mapboxGlDrawStaticMode2.default;
        var drawOptions = { displayControlsDefault: false, modes: modes, defaultMode: STATIC_MODE };
        this.draw = new _mapboxGlDraw2.default(drawOptions);
        this.map.addControl(this.draw);
      }
    }

    /** Initialize the map */

  }, {
    key: 'configureMap',
    value: function configureMap() {
      var _this2 = this;

      // initialize the map.
      if (mapboxgl) {
        mapboxgl.accessToken = this.props.mapbox.accessToken;
        this.map = new mapboxgl.Map({
          interactive: this.props.interactive,
          minZoom: (0, _util.getKey)(this.props.map.metadata, _constants.MIN_ZOOM_KEY),
          maxZoom: (0, _util.getKey)(this.props.map.metadata, _constants.MAX_ZOOM_KEY),
          renderWorldCopies: this.props.wrapX,
          container: this.mapdiv,
          style: this.props.map
        });
      }
      this.sourcesVersion = getVersion(this.props.map, _constants.SOURCE_VERSION_KEY);
      this.layersVersion = getVersion(this.props.map, _constants.LAYER_VERSION_KEY);
      // when the map moves update the location in the state
      if (this.map) {
        this.props.setSize([this.mapdiv.offsetWidth, this.mapdiv.offsetHeight], this.map);

        this.props.setProjection(this.props.projection);

        this.map.on('resize', function () {
          _this2.props.setSize([_this2.mapdiv.offsetWidth, _this2.mapdiv.offsetHeight], _this2.map);
        });

        if (this.props.hover) {
          this.map.on('mousemove', function (e) {
            _this2.onMouseMove(e);
          });
        }
        this.map.on('moveend', function () {
          _this2.onMapMoveEnd();
        });
        this.map.on('click', function (e) {
          _this2.onMapClick(e);
        });
        // this is done after the map loads itself for the first time.
        //  otherwise the map was not always ready for the initial popups.
        if (this.props.initialPopups.length > 0) {
          this.map.on('load', this.onMapLoad);
        }
      }
      // check for any interactions
      if (this.props.drawing && this.props.drawing.interaction && this.map) {
        this.addDrawIfNeeded();
        this.updateInteraction(this.props.drawing);
      }
    }

    /** Callback for finished drawings, converts the event's feature
     *  to GeoJSON and then passes the relevant information on to
     *  this.props.onFeatureDrawn, this.props.onFeatureModified.
     *
     *  @param {string} eventType One of 'drawn', 'modified'.
     *  @param {string} sourceName Name of the geojson source.
     *  @param {Object} collection GeoJSON feature collection.
     *
     */

  }, {
    key: 'onFeatureEvent',
    value: function onFeatureEvent(eventType, sourceName, collection) {
      if (collection !== undefined) {
        // Pass on feature drawn this map object, the target source,
        //  and the drawn feature.
        if (eventType === 'drawn') {
          this.props.onFeatureDrawn(this, sourceName, collection);
        } else if (eventType === 'modified') {
          this.props.onFeatureModified(this, sourceName, collection);
        }
      }
    }
  }, {
    key: 'getMode',
    value: function getMode(type) {
      if (type === 'Point') {
        return 'draw_point';
      } else if (type === 'LineString') {
        return 'draw_line_string';
      } else if (type === 'Polygon') {
        return 'draw_polygon';
      }
    }
  }, {
    key: 'onDrawCreate',
    value: function onDrawCreate(evt, mode) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      this.onFeatureEvent('drawn', this.props.drawing.sourceName, { type: 'FeatureCollection', features: evt.features });
      var draw = this.draw;
      window.setTimeout(function () {
        // allow to draw more features
        draw.changeMode(mode, options);
      }, 0);
    }
  }, {
    key: 'onDrawModify',
    value: function onDrawModify(evt, mode) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      this.onFeatureEvent('modified', this.props.drawing.sourceName, { type: 'FeatureCollection', features: evt.features });
      var draw = this.draw;
      window.setTimeout(function () {
        draw.changeMode(mode, options);
      }, 0);
    }
  }, {
    key: 'onDrawRender',
    value: function onDrawRender(evt) {
      var collection = this.draw.getAll();
      if (collection.features.length > 0) {
        this.props.setMeasureGeometry(collection.features[0].geometry);
      }
    }
  }, {
    key: 'setMode',
    value: function setMode(defaultMode, customMode) {
      return customMode ? customMode : defaultMode;
    }
  }, {
    key: 'optionsForMode',
    value: function optionsForMode(mode, evt) {
      if (mode === DIRECT_SELECT_MODE) {
        return { featureId: evt.features[0].id };
      }
      return {};
    }
  }, {
    key: 'modeOptions',
    value: function modeOptions(_modeOptions) {
      return _modeOptions ? _modeOptions : {};
    }
  }, {
    key: 'addFeaturesToDrawForSource',
    value: function addFeaturesToDrawForSource(sourceName) {
      var _this3 = this;

      if (this.draw) {
        this.draw.deleteAll();
        if (this.props.map.sources[sourceName] && this.props.map.sources[sourceName].data && this.props.map.sources[sourceName].data.features) {
          this.props.map.sources[sourceName].data.features.forEach(function (feature) {
            _this3.draw.add(feature);
          });
        }
      }
    }
  }, {
    key: 'updateInteraction',
    value: function updateInteraction(drawingProps) {
      var _this4 = this;

      // this assumes the interaction is different,
      //  so the first thing to do is clear out the old interaction
      if (this.activeInteractions !== null) {
        for (var i = 0, ii = this.activeInteractions.length; i < ii; i++) {
          this.map.removeControl(this.activeInteractions[i]);
        }
        this.activeInteractions = null;
      }
      if (_constants.INTERACTIONS.drawing.includes(drawingProps.interaction)) {
        this.addFeaturesToDrawForSource(drawingProps.sourceName);
        this.currentMode = this.setMode(this.getMode(drawingProps.interaction), drawingProps.currentMode);
        this.afterMode = this.setMode(this.currentMode, drawingProps.afterMode);
        this.draw.changeMode(this.currentMode, this.modeOptions(drawingProps.currentModeOptions));
      } else if (_constants.INTERACTIONS.modify === drawingProps.interaction || _constants.INTERACTIONS.select === drawingProps.interaction) {
        this.addFeaturesToDrawForSource(drawingProps.sourceName);
        this.currentMode = this.setMode(SIMPLE_SELECT_MODE, drawingProps.currentMode);
        this.draw.changeMode(this.currentMode, this.modeOptions(drawingProps.currentModeOptions));
        this.afterMode = this.setMode(DIRECT_SELECT_MODE, drawingProps.afterMode);
      } else if (_constants.INTERACTIONS.measuring.includes(drawingProps.interaction)) {
        this.addFeaturesToDrawForSource(drawingProps.sourceName);
        // clear the previous measure feature.
        this.props.clearMeasureFeature();
        // The measure interactions are the same as the drawing interactions
        // but are prefixed with "measure:"
        var measureType = drawingProps.interaction.split(':')[1];
        this.currentMode = this.setMode(this.getMode(measureType), drawingProps.currentMode);
        this.draw.changeMode(this.currentMode, this.modeOptions(drawingProps.currentModeOptions));
        if (!this.addedMeasurementListener) {
          this.map.on('draw.render', function (evt) {
            _this4.onDrawRender(evt);
          });
          this.addedMeasurementListener = true;
        }
      } else {
        if (this.draw) {
          this.draw.changeMode(STATIC_MODE);
        }
      }
      if (drawingProps.sourceName) {
        var drawCreate = function drawCreate(evt) {
          _this4.onDrawCreate(evt, _this4.afterMode, _this4.optionsForMode(_this4.afterMode, evt));
        };
        var drawModify = function drawModify(evt) {
          _this4.onDrawModify(evt, _this4.afterMode, _this4.optionsForMode(_this4.afterMode, evt));
        };
        this.map.off('draw.create', drawCreate);
        this.map.on('draw.create', drawCreate);
        this.map.off('draw.update', drawModify);
        this.map.on('draw.update', drawModify);
      }

      if (this.activeInteractions) {
        for (var _i = 0, _ii = this.activeInteractions.length; _i < _ii; _i++) {
          this.map.addControl(this.activeInteractions[_i]);
        }
      }
    }
  }, {
    key: 'addPopup',
    value: function addPopup(popup) {
      var id = _uuid2.default.v4();
      var elem = document.createElement('div');
      elem.setAttribute('class', 'sdk-mapbox-gl-popup');
      var overlay = void 0;
      if (mapboxgl) {
        overlay = new mapboxgl.Marker(elem);
        // set the popup id so we can match the component
        // to the overlay.
        overlay.popupId = id;
        var coord = popup.props.coordinate;
        var lngLat = new mapboxgl.LngLat(coord['0'], coord['1']);
        this.overlays.push(overlay.setLngLat(lngLat).addTo(this.map));
      }
      var self = this;
      // render the element into the popup's DOM.
      _reactDom2.default.render(popup, elem, function addInstance() {
        self.popups[id] = this;
        self.elems[id] = elem;
        this.setMap(self);
      });

      var size = _reactDom2.default.findDOMNode(elem).getBoundingClientRect();
      var yTransform = size.height / 2 + 11;
      var xTransform = size.width / 2 - 48;
      if (overlay) {
        overlay.setOffset([xTransform, -yTransform]);
      }
    }
  }, {
    key: 'updatePopups',
    value: function updatePopups() {
      var _this5 = this;

      var overlays = this.overlays;
      var overlays_to_remove = [];

      overlays.forEach(function (overlay) {
        var id = overlay.popupId;
        if (_this5.popups[id] && _this5.popups[id].state.closed !== false) {
          _this5.popups[id].setMap(null);
          // mark this for removal
          overlays_to_remove.push(overlay);
          // umount the component from the DOM
          _reactDom2.default.unmountComponentAtNode(_this5.elems[id]);
          // remove the component from the popups hash
          delete _this5.popups[id];
          delete _this5.elems[id];
        }
      });

      // remove the old/closed overlays from the map.
      for (var i = 0, ii = overlays_to_remove.length; i < ii; i++) {
        overlays_to_remove[i].remove();
      }
    }
  }]);

  return MapboxGL;
}(_react2.default.Component);

exports.MapboxGL = MapboxGL;


MapboxGL.propTypes = _extends({}, _mapCommon2.default.propTypes, {
  /** Initial drawing modes that are available for drawing */
  drawingModes: _propTypes2.default.arrayOf(_propTypes2.default.object)
});

MapboxGL.defaultProps = _extends({}, _mapCommon2.default.defaultProps);

function mapStateToProps(state) {
  return {
    map: state.map,
    drawing: state.drawing,
    print: state.print,
    mapbox: state.mapbox
  };
}

/** Get the extent for the map.
 *
 *  @param {MapboxGLMap} map - The MapboxGL Map instance.
 *
 *  @return {Array} of minx, miny, maxx, maxy
 */
function getMapExtent(map) {
  var bounds = map.getBounds();
  var sw = bounds.getSouthWest();
  var ne = bounds.getNorthEast();
  return [sw.lng, sw.lat, ne.lng, ne.lat];
}

function mapDispatchToProps(dispatch) {
  return {
    updateLayer: function updateLayer(layerId, layerConfig) {},
    setView: function setView(view) {
      dispatch((0, _map.setView)(view.center, view.zoom));
      dispatch((0, _map.setBearing)(view.bearing));
      dispatch((0, _mapinfo.setMapExtent)(view.extent));
      dispatch((0, _mapinfo.setResolution)(view.resolution));
    },
    setSize: function setSize(size, map) {
      dispatch((0, _mapinfo.setMapSize)(size));
      dispatch((0, _mapinfo.setMapExtent)(getMapExtent(map)));
    },
    setProjection: function setProjection(projection) {
      dispatch((0, _mapinfo.setProjection)(projection));
    },
    setMeasureGeometry: function setMeasureGeometry(geom) {
      var segments = [];
      if (geom.type === 'LineString') {
        for (var i = 0, ii = geom.coordinates.length - 1; i < ii; i++) {
          var a = geom.coordinates[i];
          var b = geom.coordinates[i + 1];
          segments.push((0, _distance2.default)(a, b));
        }
      } else if (geom.type === 'Polygon' && geom.coordinates.length > 0) {
        segments.push((0, _area2.default)(geom));
      }
      dispatch((0, _drawing.setMeasureFeature)({
        type: 'Feature',
        properties: {},
        geometry: geom
      }, segments));
    },
    clearMeasureFeature: function clearMeasureFeature() {
      dispatch((0, _drawing.clearMeasureFeature)());
    },
    setMousePosition: function setMousePosition(lngLat) {
      dispatch((0, _mapinfo.setMousePosition)(lngLat));
    }
  };
}

/** Export the connected class by default.
 *  Ensure that withRef is set to true so getWrappedInstance will return the Map.
 */
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, undefined, { withRef: true })(MapboxGL);