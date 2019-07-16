"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../database/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var bookingController =
/*#__PURE__*/
function () {
  function bookingController() {
    _classCallCheck(this, bookingController);
  }

  _createClass(bookingController, null, [{
    key: "createBooking",
    value: function createBooking(req, res) {
      var decodedUser = req.user;

      if (decodedUser) {
        var trip_id = req.body.trip_id;
        var booking = {
          trip_id: trip_id,
          created_on: new Date()
        };
        var tripQuery = {
          text: 'SELECT bus_id, trip_date FROM trips WHERE trip_id = $1',
          values: [booking.trip_id]
        };

        _db["default"].query(tripQuery, function (error, data) {
          if (data) {
            var seatNumberQuery = {
              text: 'SELECT FROM bookings where trip_id = $1',
              values: [booking.trip_id]
            };

            _db["default"].query(seatNumberQuery, function (seatNumberError, seatNumberData) {
              var seatNumber = seatNumberData.rowCount;
              seatNumber += 1;
              var bookingQuery = {
                text: 'INSERT INTO bookings (user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email, created_on) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *',
                values: [decodedUser.user_id, booking.trip_id, data.rows[0].bus_id, data.rows[0].trip_date, seatNumber, decodedUser.first_name, decodedUser.last_name, decodedUser.email, booking.created_on]
              };

              _db["default"].query(bookingQuery, function (bookingError, bookingData) {
                return res.status(201).send({
                  status: 'success',
                  data: {
                    id: bookingData.rows[0].booking_id,
                    user_id: bookingData.rows[0].user_id,
                    trip_id: bookingData.rows[0].trip_id,
                    bus_id: bookingData.rows[0].bus_id,
                    trip_date: bookingData.rows[0].trip_date,
                    seat_number: bookingData.rows[0].seat_number,
                    first_name: bookingData.rows[0].first_name,
                    last_name: bookingData.rows[0].last_name,
                    email: bookingData.rows[0].email
                  }
                });
              });
            });
          }
        });
      }
    }
  }, {
    key: "getBooking",
    value: function getBooking(req, res) {
      var decodedUser = req.user;

      switch (decodedUser.is_admin) {
        case true:
          var adminQuery = 'SELECT * from bookings';

          _db["default"].query(adminQuery, function (error, data) {
            return res.status(200).send({
              status: 'success',
              data: [data.rows]
            });
          });

          break;

        case false:
          var nonAdminQuery = {
            text: 'SELECT * FROM bookings WHERE user_id = $1',
            values: [decodedUser.user_id]
          };

          _db["default"].query(nonAdminQuery, function (error, data) {
            return res.status(200).send({
              status: 'success',
              data: [data.rows]
            });
          });

          break;

        default:
          return res.status(200).send({
            status: 'error',
            error: 'Not Allowed'
          });
      }
    }
  }, {
    key: "deleteBooking",
    value: function deleteBooking(req, res) {
      var decodedUser = req.user;

      if (decodedUser) {
        if (Number.isNaN(req.params.bookingId)) {
          return res.status(400).send({
            status: 'error',
            error: 'Invalid Booking ID'
          });
        }

        var deleteQuery = {
          text: 'DELETE FROM bookings WHERE booking_id = $1',
          values: [req.params.bookingId]
        };

        _db["default"].query(deleteQuery, function (error, data) {
          if (data.rows.length === 0) {
            return res.status(200).send({
              status: 'success',
              data: {
                message: 'Booking deleted successfully'
              }
            });
          }
        });
      }
    }
  }, {
    key: "changeSeatNumber",
    value: function changeSeatNumber(req, res) {
      var decodedUser = req.user;
      var seat_number = req.body.seat_number;

      if (decodedUser) {
        if (Number.isNaN(req.params.bookingId)) {
          return res.status(400).send({
            status: 'error',
            error: 'Invalid Booking ID'
          });
        }

        var changeSeatQuery = {
          text: 'SELECT * FROM bookings WHERE booking_id = $1',
          values: [req.params.bookingId]
        };

        _db["default"].query(changeSeatQuery, function (error, data) {
          if (data) {
            var checkSeatQuery = {
              text: 'SELECT * FROM bookings WHERE trip_id = $1',
              values: [data.rows[0].trip_id]
            };

            _db["default"].query(checkSeatQuery, function (seatError, seatData) {
              var filteredData = seatData.rows.filter(function (seatNumber) {
                return seatNumber.seat_number === seat_number;
              });

              if (filteredData.length > 0) {
                return res.status(409).send({
                  status: 'error',
                  error: 'Seat Number has been taken'
                });
              }

              var changeSeatNumberQuery = {
                text: "UPDATE bookings SET seat_number = ".concat(seat_number, " WHERE booking_id = $1"),
                values: [req.params.bookingId]
              };

              _db["default"].query(changeSeatNumberQuery, function (newError, newData) {
                if (newData) {
                  return res.status(200).send({
                    status: 'success',
                    data: {
                      message: 'Seat Number changed successfully'
                    }
                  });
                }
              });
            });
          }
        });
      }
    }
  }]);

  return bookingController;
}();

var _default = bookingController;
exports["default"] = _default;