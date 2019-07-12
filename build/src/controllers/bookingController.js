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
        var _req$body = req.body,
            trip_id = _req$body.trip_id,
            bus_id = _req$body.bus_id,
            trip_date = _req$body.trip_date,
            seat_number = _req$body.seat_number;
        var booking = {
          user_id: decodedUser.user_id,
          trip_id: trip_id,
          bus_id: bus_id,
          trip_date: trip_date,
          is_admin: decodedUser.is_admin,
          seat_number: seat_number,
          created_on: new Date()
        };
        var query = {
          text: 'INSERT INTO bookings (user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email, created_on) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *',
          values: [booking.user_id, booking.trip_id, booking.bus_id, booking.trip_date, booking.seat_number, decodedUser.first_name, decodedUser.last_name, decodedUser.email, booking.created_on]
        };

        _db["default"].query(query, function (error, data) {
          if (data) {
            return res.status(201).send({
              status: 'success',
              data: {
                booking_id: data.rows[0].booking_id,
                user_id: data.rows[0].user_id,
                trip_id: data.rows[0].trip_id,
                bus_id: data.rows[0].bus_id,
                trip_date: data.rows[0].trip_date,
                seat_number: data.rows[0].seat_number,
                first_name: data.rows[0].first_name,
                last_name: data.rows[0].last_name,
                email: data.rows[0].email
              }
            });
          }

          return res.status(400).send({
            status: 'error',
            error: 'Booking was not successful'
          });
        });
      }
    }
  }]);

  return bookingController;
}();

var _default = bookingController;
exports["default"] = _default;