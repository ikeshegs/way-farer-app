"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var pool = new _pg.Pool({
  connectionString: process.env.DB_URL || process.env.PROD_DB_URL
});
pool.on('connect', function () {
  console.log('connected to the database');
});
var _default = pool; // require('make-runnable');

exports["default"] = _default;