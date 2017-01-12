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
import {Tabs, Tab} from 'material-ui/Tabs';
import classNames from 'classnames';
import {intlShape, defineMessages, injectIntl} from 'react-intl';
import LabelEditor from './LabelEditor';
import Paper from 'material-ui/Paper';
import PolygonSymbolizerEditor from './PolygonSymbolizerEditor';
import LineSymbolizerEditor from './LineSymbolizerEditor';
import PointSymbolizerEditor from './PointSymbolizerEditor';
import FilterEditor from './FilterEditor';
import TextField from 'material-ui/TextField';
import pureRender from 'pure-render-decorator';

const messages = defineMessages({
  titlelabel: {
    id: 'ruleeditor.titlelabel',
    description: 'Label for the title text field',
    defaultMessage: 'Title'
  },
  symbolizertitle: {
    id: 'ruleeditor.symbolizertitle',
    description: 'Title for the symbolizer tab',
    defaultMessage: 'Symbolizer'
  },
  labeltitle: {
    id: 'ruleeditor.labeltitle',
    description: 'Title for the label tab',
    defaultMessage: 'Label'
  },
  filtertitle: {
    id: 'ruleeditor.filtertitle',
    description: 'Title for the filter tab',
    defaultMessage: 'Filter'
  }
});

/**
 * Editor for a style rule. This means editing symbolizer properties and filter. Used by the Style Modal.
 *
 * ```xml
 * <RuleEditor geometryType={this.state.geometryType} visible={rule.name === this.state.rule} key={key} initialState={symbol} onChange={this._onChange.bind(this)} attributes={this.state.attributes} />
 * ```
 */
@pureRender
class RuleEditor extends React.Component {
  static propTypes = {
    /**
     * Are we visible or not?
     */
    visible: React.PropTypes.bool,
    /**
     * List of attributes.
     */
    attributes: React.PropTypes.array,
    /**
     * Initial state.
     */
    initialState: React.PropTypes.object,
    /**
     * Css class name to apply on the root element of this component.
     */
    className: React.PropTypes.string,
    /**
     * Callback that is called when a change is made.
     */
    onChange: React.PropTypes.func.isRequired,
    /**
     * The geometry type.
     */
    geometryType: React.PropTypes.oneOf(['Polygon', 'LineString', 'Point']),
    /**
     * @ignore
     */
    intl: intlShape.isRequired
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    var title = this.props.initialState ? this.props.initialState.title : undefined;
    this.state = {
      value: 1,
      title: title
    };
  }
  handleChange(value) {
    if (value === parseInt(value, 10)) {
      this.setState({
        value: value
      });
    }
  }
  _onTitleBlur() {
    var title = this.refs.title.getValue();
    this.setState({title: title});
    this.props.onChange({
      title: title
    });
  }
  _onTitleChange() {
    var title = this.refs.title.getValue();
    this.setState({title: title});
  }
  _getSymbolizer() {
    if (this.props.initialState && this.props.initialState.symbolizers && this.props.initialState.symbolizers.length > 0) {
      return this.props.initialState.symbolizers[0];
    }
  }
  _getTextSymbolizer() {
    if (this.props.initialState) {
      for (var i = 0, ii = this.props.initialState.symbolizers.length; i < ii; ++i) {
        var sym = this.props.initialState.symbolizers[i];
        if (sym.labelAttribute) {
          return sym;
        }
      }
    }
  }
  _getTabs() {
    const {formatMessage} = this.props.intl;
    var tabs = [];
    var symbol = this._getSymbolizer();
    if (this.props.geometryType === 'Polygon') {
      tabs.push((<Tab key='poly' value={1} label={formatMessage(messages.symbolizertitle)} disableTouchRipple={true}>
          <PolygonSymbolizerEditor intl={this.props.intl} onChange={this.props.onChange} initialState={symbol} />
        </Tab>
      ));
    } else if (this.props.geometryType === 'LineString') {
      tabs.push((<Tab key='line' value={1} label={formatMessage(messages.symbolizertitle)} disableTouchRipple={true}>
          <LineSymbolizerEditor intl={this.props.intl} onChange={this.props.onChange} initialState={symbol} />
        </Tab>
      ));
    } else if (this.props.geometryType === 'Point') {
      tabs.push((<Tab key='point' value={1} label={formatMessage(messages.symbolizertitle)} disableTouchRipple={true}>
          <PointSymbolizerEditor intl={this.props.intl} onChange={this.props.onChange} initialState={symbol} />
        </Tab>
      ));
    }
    var textSym = this._getTextSymbolizer();
    tabs.push((<Tab key='label' value={3} label={formatMessage(messages.labeltitle)} disableTouchRipple={true}>
         <LabelEditor attributes={this.props.attributes} intl={this.props.intl} onChange={this.props.onChange} initialFontColor={textSym ? textSym.fontColor : undefined} initialFontSize={textSym ? textSym.fontSize : undefined} initialLabelAttribute={textSym ? textSym.labelAttribute : undefined} />
       </Tab>),
      (<Tab key='filter' value={4} label={formatMessage(messages.filtertitle)} disableTouchRipple={true}>
         <FilterEditor intl={this.props.intl} onChange={this.props.onChange} initialExpression={this.props.initialState ? this.props.initialState.expression : undefined} />
       </Tab>)
    );
    return tabs;
  }
  render() {
    if (this.props.visible) {
      const {formatMessage} = this.props.intl;
      var tabs = this._getTabs();
      return (
        <Paper className={classNames('sdk-component rule-editor', this.props.className)} zDepth={0}>
          <TextField value={this.state.title} ref='title' onBlur={this._onTitleBlur.bind(this)} onChange={this._onTitleChange.bind(this)} floatingLabelText={formatMessage(messages.titlelabel)} />
          <Tabs value={this.state.value} onChange={this.handleChange.bind(this)}>
            {tabs}
          </Tabs>
        </Paper>
      );
    } else {
      return (<article />);
    }
  }
}

export default injectIntl(RuleEditor);
