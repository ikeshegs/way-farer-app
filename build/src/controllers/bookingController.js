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
            seat_number = _req$body.seat_number;
        var booking = {
          user_id: decodedUser.user_id,
          trip_id: trip_id,
          is_admin: decodedUser.is_admin,
          seat_number: seat_number,
          created_on: new Date()
        };
        var query = {
          text: 'INSERT INTO bookings (user_id, trip_id, seat_number, created_on) VALUES ($1, $2, $3, $4) returning *',
          values: [booking.user_id, booking.trip_id, booking.seat_number, booking.created_on]
        };

        _db["default"].query(query, function (error, data) {
          console.log('error', error);

          if (data) {
            var query2 = {
              text: 'SELECT * FROM trips WHERE trip_id = $1',
              values: [trip_id]
            };

            _db["default"].query(query2, function (err, result) {
              return res.status(201).send({
                status: 'success',
                data: {
                  booking_id: data.rows[0].booking_id,
                  user_id: data.rows[0].user_id,
                  trip_id: data.rows[0].trip_id,
                  bus_id: result.rows[0].trip_id,
                  trip_date: result.rows[0].trip_date,
                  seat_number: data.rows[0].seat_number,
                  first_name: decodedUser.first_name,
                  last_name: decodedUser.last_name,
                  email: decodedUser.email
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