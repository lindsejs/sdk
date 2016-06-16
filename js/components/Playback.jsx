/*
 * Copyright 2015-present Boundless Spatial Inc., http://boundlessgeo.com
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React from 'react';
import ol from 'openlayers';
import classNames from 'classnames';
import TimeService from '../services/TimeService.js';
import IconButton from 'material-ui/lib/icon-button';
import PlayIcon from 'material-ui/lib/svg-icons/av/play-arrow';
import PauseIcon from 'material-ui/lib/svg-icons/av/pause';
import Slider from 'material-ui/lib/slider';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import LayerStore from '../stores/LayerStore.js';
import {injectIntl, intlShape} from 'react-intl';
import pureRender from 'pure-render-decorator';

/**
 * Adds a slider to the map that can be used to select a given date, and modifies the visibility of layers and features depending on their timestamp and the current time.
 *
 * ```javascript
 * class PlaybackApp extends App {
 *   render() {
 *     return (
 *       <div id='content'>
 *         <div ref='map' id='map'>
 *           <div id='timeline'><Playback map={map} minDate={324511200000} maxDate={1385938800000} /></div>
 *         </div>
 *       </div>
 *     );
 *   }
 * }
 * ```
 */
@pureRender
class Playback extends React.Component {
  constructor(props) {
    super(props);
    LayerStore.bindMap(this.props.map);
    var interval;
    if (this.props.maxDate !== undefined && this.props.minDate !== undefined) {
      interval = (this.props.maxDate - this.props.minDate) / this.props.numIntervals;
    }
    this.state = {
      play: true,
      minDate: this.props.minDate,
      date: this.props.minDate,
      maxDate: this.props.maxDate,
      interval: interval
    };
    this._layers = [];
    // TODO
    this._loading = 0;
    this._loaded = 0;
  }
  componentDidMount() {
    this._onChangeCb = this._onChange.bind(this);
    LayerStore.addChangeListener(this._onChangeCb);
    this._onChange();
    if (this.props.autoPlay === true) {
      this._playPause();
    }
  }
  componentWillUnmount() {
    LayerStore.removeChangeListener(this._onChangeCb);
  }
  _onChange() {
    var state = LayerStore.getState();
    for (var i = 0, ii = state.flatLayers.length; i < ii; ++i) {
      var lyr = state.flatLayers[i];
      if (lyr.get('timeInfo') && this._layers.indexOf(lyr) === -1) {
        this._registerTime(lyr);
        this._layers.push(lyr);
      }
    }
  }
  _onSubmit(evt) {
    evt.preventDefault();
  }
  _play() {
    if (this._loading === this._loaded) {
      var newTime = this.state.date + this.state.interval;
      if (newTime > this.state.maxDate) {
        newTime = this.state.minDate;
      }
      this.setState({date: newTime});
    }
  }
  _playPause() {
    var play = !this.state.play;
    this.setState({play: play});
    if (play) {
      window.clearInterval(this._timer);
    } else {
      this._timer = window.setInterval(this._play.bind(this), this.props.interval);
    }
  }
  _registerTime(lyr) {
    var timeInfo;
    if (lyr instanceof ol.layer.Vector) {
      var style = lyr.getStyle();
      timeInfo = lyr.get('timeInfo');
      var me = this;
      lyr.setStyle(function(feature, resolution) {
        var start = (timeInfo.start === parseInt(timeInfo.start, 10)) ? timeInfo.start : Date.parse(feature.get(timeInfo.start));
        if (isNaN(start) || start > me.state.date) {
          return null;
        }
        var end = (timeInfo.end === parseInt(timeInfo.end, 10)) ? timeInfo.end : Date.parse(feature.get(timeInfo.end));
        if (isNaN(end) || end < me.state.date) {
          return null;
        }
        if (style instanceof ol.style.Style || Array.isArray(style)) {
          return style;
        } else {
          return style.call(this, feature, resolution);
        }
      });
    } else if (lyr instanceof ol.layer.Tile || lyr instanceof ol.layer.Image) {
      var source = lyr.getSource();
      timeInfo = TimeService.parse(lyr.get('timeInfo'));
      this.setState({
        minDate: timeInfo.start,
        maxDate: timeInfo.end,
        date: timeInfo.start,
        interval: timeInfo.duration
      });
      if (lyr instanceof ol.layer.Tile) {
        source.on('tileloadstart', this._addLoading, this);
        source.on('tileloadend', this._addLoaded, this);
        source.on('tileloaderror', this._addLoaded, this);
      } else if (lyr instanceof ol.layer.Image) {
        source.on('imageloadstart', this._addLoading, this);
        source.on('imageloadend', this._addLoaded, this);
        source.on('imageloaderror', this._addLoaded, this);
      }
    }
  }
  _addLoading() {
    this._loading++;
  }
  _addLoaded() {
    this._loaded++;
  }
  _handleTimeLayer(lyr) {
    if (lyr.get('timeInfo')) {
      if (lyr instanceof ol.layer.Vector) {
        lyr.getSource().changed();
      } else {
        lyr.getSource().updateParams({'TIME': new Date(this.state.date).toISOString()});
      }
    }
  }
  _forEachLayer(lyr, func) {
    if (lyr instanceof ol.layer.Group) {
      lyr.getLayers().forEach(function(child) {
        this._forEachLayer(child, func);
      }, this);
    } else {
      func.call(this, lyr);
    }
  }
  _refreshTimeLayers() {
    this._forEachLayer(this.props.map.getLayerGroup(), this._handleTimeLayer);
  }
  _onRangeChange(evt, value) {
    this.setState({date: value});
  }
  _onDateChange(evt, value) {
    this.setState({date: value.getTime()});
  }
  render() {
    var buttonIcon;
    if (this.state.play === true) {
      buttonIcon = <PlayIcon />;
    } else {
      buttonIcon = <PauseIcon />;
    }
    var controls;
    if (this.state.minDate !== undefined && this.state.maxDate !== undefined && this.state.date !== undefined) {
      this._refreshTimeLayers();
      var minDate = new Date(this.state.minDate);
      var maxDate = new Date(this.state.maxDate);
      controls = [
        (<IconButton key='play' style={{'float': 'left'}} onTouchTap={this._playPause.bind(this)}>{buttonIcon}</IconButton>),
        (<Slider step={this.state.interval} key='slider' style={{width: 200, 'float': 'left'}} min={this.state.minDate} max={this.state.maxDate} value={this.state.date} onChange={this._onRangeChange.bind(this)} />),
        (<DatePicker key='date' autoOk={true} minDate={minDate} maxDate={maxDate} style={{width: 200, paddingLeft: 15, overflow: 'hidden'}} onChange={this._onDateChange.bind(this)} value={new Date(this.state.date)} />)
      ];
    }
    return (
      <div className={classNames('sdk-component playback', this.props.className)}>
        {controls}
      </div>
    );
  }
}

Playback.propTypes = {
  /**
   * The map whose time-enabled layers should be filtered. Time-enabled layers are layers that have a timeInfo property.
   */
  map: React.PropTypes.instanceOf(ol.Map).isRequired,
  /**
   * The minimum date to use for the slider field and the date picker.
   */
  minDate: React.PropTypes.number,
  /**
   * The maximum date to use for the slider field and the date picker.
   */
  maxDate: React.PropTypes.number,
  /**
   * The time, in milliseconds, to wait in each position of the slider. Positions are defined by dividing the slider range by the number of intervals defined in the numIntervals parameter.
   */
  interval: React.PropTypes.number,
  /**
   * The number of intervals into which the full range of the slider is divided.
   */
  numIntervals: React.PropTypes.number,
  /**
   * Should the playback tool start playing automatically?
   */
  autoPlay: React.PropTypes.bool,
  /**
   * Css class name to apply on the root element of this component.
   */
  className: React.PropTypes.string,
  /**
   * i18n message strings. Provided through the application through context.
   */
  intl: intlShape.isRequired
};

Playback.defaultProps = {
  interval: 500,
  numIntervals: 100,
  autoPlay: false
};

export default injectIntl(Playback);
