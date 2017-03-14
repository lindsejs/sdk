/* global afterEach, beforeEach, describe, it */

import React from 'react';
import ReactDOM from 'react-dom';
import {assert} from 'chai';
import raf from 'raf';
import ol from 'openlayers';
import intl from '../mock-i18n';
import 'phantomjs-polyfill-object-assign';
import QueryBuilder from '../../src/components/QueryBuilder';

raf.polyfill();

describe('QueryBuilder', function() {
  var target, map, layers;
  var width = 360;
  var height = 180;

  beforeEach(function(done) {
    target = document.createElement('div');
    var style = target.style;
    style.position = 'absolute';
    style.left = '-1000px';
    style.top = '-1000px';
    style.width = width + 'px';
    style.height = height + 'px';
    layers = [
      new ol.layer.Vector({
        id: 'foo',
        isSelectable: true,
        source: new ol.source.Vector()
      }),
      new ol.layer.Vector({
        id: 'bar',
        isSelectable: false,
        source: new ol.source.Vector()
      })
    ];
    document.body.appendChild(target);
    map = new ol.Map({
      target: target,
      layers: layers,
      view: new ol.View({
        center: [0, 0],
        zoom: 1
      })
    });
    map.once('postrender', function() {
      done();
    });
  });

  afterEach(function() {
    map.setTarget(null);
    document.body.removeChild(target);
  });


  it('only layers with isSelectable are shown in layer selector', function() {
    var container = document.createElement('div');
    var qb = ReactDOM.render((
      <QueryBuilder intl={intl} map={map}/>
    ), container);
    assert.equal(qb.refs.layerSelector.state.layers.length, 1);
    ReactDOM.unmountComponentAtNode(container);
  });

});
