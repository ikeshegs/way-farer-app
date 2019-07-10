"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var usersTable = 'DROP TABLE IF EXISTS users CASCADE; ';
var tripsTable = 'DROP TABLE IF EXISTS trips CASCADE; ';
var busesTable = 'DROP TABLE IF EXISTS buses CASCADE; ';
var bookingsTable = 'DROP TABLE IF EXISTS bookings CASCADE; ';
var dropQuery = "".concat(usersTable).concat(tripsTable).concat(busesTable).concat(bookingsTable);
var _default = dropQuery;
exports["default"] = _default;