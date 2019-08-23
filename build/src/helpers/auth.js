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
  var header = req.headers.authorization || req.query.token || req.body.token;

  if (typeof header !== 'undefined') {
    var bearer = header.split(' ');
    var token = bearer[1];
    req.token = token;

    try {
      var userDetails = {
        id: token.id,
        isAdmin: token.is_admin
      };

      var result = _jsonwebtoken["default"].verify(userDetails, process.env.JWT_KEY);

      req.user = result;
    } catch (e) {
      return res.status(403).json({
        status: 'error',
        error: 'Forbidden'
      });
    }

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