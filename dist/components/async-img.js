'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * WARNING! This class uses a "mounted" member of state
 * which react recommends against.  Changing that would make the
 * code a lot messier and this solution is otherwise a clean way
 * to get protected images.
 */
var AsyncImage = function (_React$Component) {
  _inherits(AsyncImage, _React$Component);

  function AsyncImage(props) {
    _classCallCheck(this, AsyncImage);

    var _this = _possibleConstructorReturn(this, (AsyncImage.__proto__ || Object.getPrototypeOf(AsyncImage)).call(this, props));

    _this.state = {
      data: null,
      mounted: false
    };
    return _this;
  }

  _createClass(AsyncImage, [{
    key: 'updateData',
    value: function updateData() {
      var _this2 = this;

      if (this.props.async) {
        (0, _isomorphicFetch2.default)(this.props.src, this.props.fetchOptions).then(function (r) {
          return r.blob();
        }).then(function (imgData) {
          if (_this2.state.mounted) {
            _this2.setState({ data: URL.createObjectURL(imgData) });
          }
        }).catch(function (error) {
          console.error('Error fetchimg image at:', _this2.props.src);
          _this2.props.onError(error);
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ mounted: true });
      this.updateData();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.setState({ mounted: false });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.async && this.props.src !== prevProps.src) {
        this.updateData();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = {};
      var copy_props = ['height', 'width', 'src', 'onClick', 'alt', 'className'];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = copy_props[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var prop = _step.value;

          if (this.props[prop]) {
            props[prop] = this.props[prop];
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (this.props.async) {
        props.src = this.state.data;
      }
      // it is necessary to ensure an alt tag for a11y,
      // and the prop version needs to be deleted to ensure no
      // duplicate props for the img tag.
      var alt = this.props.alt ? this.props.alt : '';
      return _react2.default.createElement('img', _extends({ alt: alt }, props));
    }
  }]);

  return AsyncImage;
}(_react2.default.Component);

exports.default = AsyncImage;


AsyncImage.propTypes = {
  /** Do we need to fetch the image asynchronous? */
  async: _propTypes2.default.bool,
  /** Options to use for fetch calls */
  fetchOptions: _propTypes2.default.object,
  /** onError callback */
  onError: _propTypes2.default.func,
  /** onCLick callback */
  onClick: _propTypes2.default.func,
  /** Width in pixels */
  width: _propTypes2.default.number,
  /** Height in pixels */
  height: _propTypes2.default.number,
  /** Source attribute */
  src: _propTypes2.default.string,
  /** Alt text */
  alt: _propTypes2.default.string,
  /** CSS class name */
  className: _propTypes2.default.string
};