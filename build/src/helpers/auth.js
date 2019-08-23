"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var createToken = function createToken(payload) {
  if (payload === undefined) {
    return;
  }

  var userDetails = {
    id: payload.id,
    isAdmin: payload.is_admin
  };

  var token = _jsonwebtoken["default"].sign(userDetails, process.env.JWT_KEY, {
    expiresIn: '24h'
  });

  return token;
}; // eslint-disable-next-line consistent-return


var verifyToken = function verifyToken(req, res, next) {
  var header = req.headers.authorization;

  if (typeof header !== 'undefined') {
    var bearer = header.split(' ');
    var token = bearer[1];

    _jsonwebtoken["default"].verify(token, process.env.JWT_KEY, function (err, result) {
      if (err) {
        res.status(403).json({
          status: 'error',
          error: 'Forbidden'
        });
      } else {
        req.user = result;
      }
    });

    next();
  } else {
    // If header is undefined
    return res.status(401).json({
      status: 'error',
      error: 'Unauthorized'
    });
  }
};

var _default = {
  createToken: createToken,
  verifyToken: verifyToken
};
exports["default"] = _default;