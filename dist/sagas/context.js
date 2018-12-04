'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContext = getContext;
exports.fetchContext = fetchContext;
exports.handleContext = handleContext;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _actionTypes = require('../action-types');

var _map = require('../actions/map');

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(fetchContext),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(handleContext);

function getContext(url) {
  return (0, _isomorphicFetch2.default)(url).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error getting context from url: ' + url);
    }
  });
}

function fetchContext(action) {
  var options, context;
  return regeneratorRuntime.wrap(function fetchContext$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = action.options;

          if (!options.url) {
            _context.next = 9;
            break;
          }

          _context.next = 4;
          return getContext(options.url);

        case 4:
          context = _context.sent;
          _context.next = 7;
          return (0, _effects.put)((0, _map.receiveContext)(context));

        case 7:
          _context.next = 12;
          break;

        case 9:
          if (!options.json) {
            _context.next = 12;
            break;
          }

          _context.next = 12;
          return (0, _effects.put)((0, _map.receiveContext)(options.json));

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function handleContext() {
  return regeneratorRuntime.wrap(function handleContext$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeEvery)(_actionTypes.CONTEXT.FETCH, fetchContext);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}