'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Icon = require('ol/style/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

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

// inspired by: https://github.com/Viglino/ol3-games/blob/master/style/ol.style.sprite.js


/** Sprite style generator.
 */
var SdkSpriteStyle = function (_IconStyle) {
  _inherits(SdkSpriteStyle, _IconStyle);

  function SdkSpriteStyle(options) {
    _classCallCheck(this, SdkSpriteStyle);

    var canvas = document.createElement('canvas');
    var width = canvas.width = options.width;
    var height = canvas.height = options.height;

    var _this = _possibleConstructorReturn(this, (SdkSpriteStyle.__proto__ || Object.getPrototypeOf(SdkSpriteStyle)).call(this, {
      img: canvas,
      imgSize: [width, height],
      rotation: options.rotation,
      scale: options.scale
    }));

    _this.color = options.color;
    _this.spriteCount = options.spriteCount;
    _this.frameRate = options.frameRate !== undefined ? options.frameRate : 100;
    _this.width = width;
    _this.height = height;
    _this.offset = [0, 0];
    var img,
        self = _this;
    img = _this.img_ = new Image();
    img.crossOrigin = options.crossOrigin || 'anonymous';
    img.src = options.src;
    if (img.width) {
      _this.drawImage_();
    } else {
      img.onload = function () {
        self.drawImage_();
      };
    }
    return _this;
  }

  _createClass(SdkSpriteStyle, [{
    key: 'drawImage_',
    value: function drawImage_() {
      var ctx = this.getImage().getContext('2d');
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.drawImage(this.img_, this.offset[0], this.offset[1], this.width, this.height, 0, 0, this.width, this.height);
      if (this.color) {
        var data = ctx.getImageData(0, 0, this.width, this.height);
        for (var i = 0, length = data.data.length; i < length; i += 4) {
          data.data[i] = this.color[0];
          data.data[i + 1] = this.color[1];
          data.data[i + 2] = this.color[2];
        }
        ctx.putImageData(data, 0, 0);
      }
    }
  }, {
    key: 'update',
    value: function update(e) {
      var step = e.frameState.time / this.frameRate;
      var offset = [(0 + Math.trunc(step) % this.spriteCount) * this.width, 0];
      if (offset[0] !== this.offset[0] || offset[1] !== this.offset[1]) {
        this.offset = offset;
        this.drawImage_();
      }
    }
  }]);

  return SdkSpriteStyle;
}(_Icon2.default);

exports.default = SdkSpriteStyle;