"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import auth from '../helpers/auth';
// import trips from '../database/trips';
var tripController =
/*#__PURE__*/
function () {
  function tripController() {
    _classCallCheck(this, tripController);
  }

  _createClass(tripController, null, [{
    key: "createTrip",
    value: function () {
      var _createTrip = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, busId, origin, destination, fare, createdOn, decodedUser, trip;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, busId = _req$body.busId, origin = _req$body.origin, destination = _req$body.destination, fare = _req$body.fare;
                createdOn = new Date();
                decodedUser = req.user;

                if (!(decodedUser.is_admin === true)) {
                  _context.next = 13;
                  break;
                }

                _context.prev = 4;
                trip = {
                  tripId: trips.length + 1,
                  busId: busId,
                  origin: origin,
                  destination: destination,
                  tripDate: createdOn,
                  fare: fare
                };
                trips.push(trip);
                return _context.abrupt("return", res.status(201).send({
                  status: 'success',
                  data: {
                    trip_id: trip.tripId,
                    bus_id: trip.busId,
                    origin: trip.origin,
                    destination: trip.destination,
                    trip_date: trip.tripDate,
                    fare: trip.fare
                  }
                }));

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](4);
                return _context.abrupt("return", res.status(401).send({
                  status: 'error',
                  error: 'Unauthorized'
                }));

              case 13:
                return _context.abrupt("return", res.status(403).send({
                  status: 'error',
                  error: 'Forbidden'
                }));

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 10]]);
      }));

      function createTrip(_x, _x2) {
        return _createTrip.apply(this, arguments);
      }

      return createTrip;
    }()
  }, {
    key: "getTrips",
    value: function () {
      var _getTrips = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var decodedUser, filterTrips;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                decodedUser = req.user;
                _context2.prev = 1;

                if (!decodedUser) {
                  _context2.next = 5;
                  break;
                }

                filterTrips = trips.filter(function (trip) {
                  return trip;
                });
                return _context2.abrupt("return", res.status(200).send({
                  status: 'success',
                  data: filterTrips
                }));

              case 5:
                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", res.status(401).send({
                  status: 'error',
                  error: 'Unauthorized'
                }));

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 7]]);
      }));

      function getTrips(_x3, _x4) {
        return _getTrips.apply(this, arguments);
      }

      return getTrips;
    }()
  }]);

  return tripController;
}();

var _default = tripController;
exports["default"] = _default;