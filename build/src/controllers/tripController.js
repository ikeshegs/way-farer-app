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

var tripController =
/*#__PURE__*/
function () {
  function tripController() {
    _classCallCheck(this, tripController);
  }

  _createClass(tripController, null, [{
    key: "createTrip",
    value: function createTrip(req, res) {
      var decodedUser = req.user;

      if (decodedUser.isAdmin === true) {
        var _req$body = req.body,
            bus_id = _req$body.bus_id,
            origin = _req$body.origin,
            destination = _req$body.destination,
            trip_date = _req$body.trip_date,
            fare = _req$body.fare;
        var trip = {
          bus_id: bus_id,
          origin: origin,
          destination: destination,
          trip_date: trip_date,
          fare: fare
        };
        var query = {
          text: 'INSERT INTO trips (bus_id, origin, destination, trip_date, fare) VALUES ($1, $2, $3, $4, $5) returning *',
          values: [trip.bus_id, trip.origin, trip.destination, trip.trip_date, trip.fare]
        };

        _db["default"].query(query, function (error, data) {
          if (error) {
            return res.status(400).json({
              status: 'error',
              error: error
            });
          }

          if (data) {
            return res.status(201).json({
              status: 'success',
              data: {
                id: data.rows[0].id,
                bus_id: data.rows[0].bus_id,
                origin: data.rows[0].origin,
                destination: data.rows[0].destination,
                trip_date: data.rows[0].trip_date,
                fare: data.rows[0].fare
              }
            });
          }

          return res.status(400).json({
            status: 'error',
            error: 'Unsuccessful'
          });
        });
      }
    } // static getTrips(req, res) {
    //   const decodedUser = req.user;
    //   if (decodedUser) {
    //     const query = 'SELECT * FROM trips';
    //     pool.query(query, (error, data) => {
    //       if (data.rows.length !== 0) {
    //         return res.status(200).json({
    //           status: 'success',
    //           data: data.rows
    //         });
    //       }
    //     });
    //   }
    // }

  }, {
    key: "getTrips",
    value: function getTrips(req, res) {
      // const decodedUser = req.user;
      var query = 'SELECT * FROM trips';

      _db["default"].query(query, function (error, data) {
        if (data.rows.length !== 0) {
          return res.status(200).json({
            status: 'success',
            data: data.rows
          });
        }
      });
    }
  }, {
    key: "patchTrip",
    value: function patchTrip(req, res) {
      var decodedUser = req.user;

      if (decodedUser.isAdmin === true) {
        if (Number.isNaN(req.params.tripId)) {
          return res.status(400).json({
            status: 'error',
            error: 'Invalid Booking ID'
          });
        } // Check if trip has already been cancelled


        var checkTrip = {
          text: "SELECT status FROM trips WHERE id = $1",
          values: [req.params.tripId]
        };

        _db["default"].query(checkTrip, function (error, data) {
          if (data.rows[0].status === 'cancelled') {
            return res.status(409).json({
              status: 'error',
              error: 'Trip has already been cancelled'
            });
          } // Update Trip status to 'Cancelled'


          var patchQuery = {
            text: "UPDATE trips SET status = 'cancelled' WHERE id = $1",
            values: [req.params.tripId]
          };

          _db["default"].query(patchQuery, function (error, newData) {
            if (newData) {
              return res.status(200).json({
                status: 'success',
                data: {
                  message: 'Trip cancelled successfully'
                }
              });
            }
          });
        });
      }
    } // static destTrip(req, res) {
    //   const decodedUser = req.user;
    //   if (decodedUser) {
    //     const filterdestination = {
    //       text: 'SELECT * FROM trips WHERE destination = $1'
    //     };
    //   }
    // }

  }]);

  return tripController;
}();

var _default = tripController;
exports["default"] = _default;