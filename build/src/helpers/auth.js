"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var createToken = function createToken(payload) {
  return _jsonwebtoken["default"].sign({
    payload: payload
  }, process.env.JWT_KEY, {
    expiresIn: '1h'
  });
};

var _default = {
  createToken: createToken
};
exports["default"] = _default;