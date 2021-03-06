"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../helpers/auth"));

var _booking = _interopRequireDefault(require("../middlewares/booking"));

var _bookingController = _interopRequireDefault(require("../controllers/bookingController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Set Router
var bookRoute = _express["default"].Router();

bookRoute.post('/api/v1/bookings', _auth["default"].verifyToken, _booking["default"].createBookingValidator, _bookingController["default"].createBooking);
bookRoute.get('/api/v1/bookings', _auth["default"].verifyToken, _bookingController["default"].getBooking);
bookRoute["delete"]('/api/v1/bookings/:bookingId', _auth["default"].verifyToken, _bookingController["default"].deleteBooking);
bookRoute.put('/api/v1/bookings/:bookingId', _auth["default"].verifyToken, _bookingController["default"].changeSeatNumber);
var _default = bookRoute;
exports["default"] = _default;