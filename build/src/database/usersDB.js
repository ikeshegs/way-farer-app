"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _createTables = require("./createTables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import dropQuery from './dropTables';
_dotenv["default"].config();

var initializerQuery = _createTables.createUsers + _createTables.createBuses + _createTables.createTrips + _createTables.createBookings;
var pool = new _pg.Pool({
  connectionString: process.env.DB_URL || process.env.PROD_DB_URL
});
pool.on('connect', function () {
  console.log('connected to the database');
});
/* const query = (text, params) =>
  new Promise((resolve, reject) => {
    pool
      .query(text, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });

query(initializerQuery, []);
*/

var _default = pool; // require('make-runnable');

exports["default"] = _default;