"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _createTables = require("./createTables");

var _dropTables = _interopRequireDefault(require("./dropTables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var createTables = _createTables.createUsers + _createTables.createBuses + _createTables.createTrips + _createTables.createBookings;
var pool = new _pg.Pool({
  connectionString: process.env.DB_URL || process.env.PROD_DATABASE_URL || process.env.TEST_DATABASE_URL
}); // let connectionUrl = process.env.DB_URL;
// if (process.env.NODE_ENV === 'production') {
//   connectionUrl = process.env.PROD_DATABASE_URL;
// } else if (process.env.NODE_ENV === 'test') {
//   connectionUrl = process.env.TEST_DATABASE_URL;
// }
// const pool = new Pool({
//   connectionString: connectionUrl
// });

pool.on('connect', function () {
  console.log('Connected to WayFarer-db database');
}); // if (process.env.NODE_ENV === 'production') {
//   pool.query(createTables, (err, data) => {
//     if (data) {
//       console.log('Tables created successfully');
//     } else if (err) {
//       console.log(err);
//     }
//   });
// } else if (process.env.NODE_ENV === 'test') {
//   pool.query(dropTables, []);
//   pool.query(createTables, []);
// }

var _default = pool; // require('make-runnable');

exports["default"] = _default;