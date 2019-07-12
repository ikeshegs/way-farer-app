"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable camelcase */
var bookingValidator =
/*#__PURE__*/
function () {
  function bookingValidator() {
    _classCallCheck(this, bookingValidator);
  }

  _createClass(bookingValidator, null, [{
    key: "createBookingValidator",
    value: function createBookingValidator(req, res, next) {
      var _req$body = req.body,
          trip_id = _req$body.trip_id,
          bus_id = _req$body.bus_id,
          trip_date = _req$body.trip_date,
          seat_number = _req$body.seat_number;

      if (typeof trip_id === 'undefined') {
        return res.status(400).send({
          status: 'error',
          error: 'Trip ID field is required'
        });
      }

      if (trip_id === '') {
        return res.status(400).send({
          status: 'error',
          error: 'Trip ID field cannot be empty'
        });
      }

      if (typeof trip_id !== 'number') {
        return res.status(400).send({
          status: 'error',
          error: 'Trip ID must be a number.'
        });
      } // BUS ID CHECK


      if (typeof bus_id === 'undefined') {
        return res.status(400).send({
          status: 'error',
          error: 'Bus ID field is required'
        });
      }

      if (bus_id === '') {
        return res.status(400).send({
          status: 'error',
          error: 'Bus ID field cannot be empty'
        });
      }

      if (typeof bus_id !== 'number') {
        return res.status(400).send({
          status: 'error',
          error: 'Bus ID must be a number.'
        });
      } // TRIP DATE CHECK


      if (typeof trip_date !== 'string') {
        return res.status(400).send({
          status: 'error',
          error: 'Trip Date must be a number.'
        });
      }

      if (typeof trip_date === 'undefined') {
        return res.status(400).send({
          status: 'error',
          error: 'Trip Date field is required.'
        });
      } // SEAT NUMBER CHECK


      if (typeof seat_number !== 'number') {
        return res.status(400).send({
          status: 'error',
          error: 'Seat Number must be a Number.'
        });
      }

      if (seat_number === ' ') {
        return res.status(400).send({
          status: 'error',
          error: 'Seat Number field cannot be a space'
        });
      }

      return next();
    }
  }]);

  return bookingValidator;
}();

var _default = bookingValidator;
exports["default"] = _default;