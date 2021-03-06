"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../helpers/auth"));

var _tripController = _interopRequireDefault(require("../controllers/tripController"));

var _trip = _interopRequireDefault(require("../middlewares/trip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var tripRoute = _express["default"].Router();

tripRoute.post('/api/v1/trips', _auth["default"].verifyToken, _trip["default"].createTripValidator, _tripController["default"].createTrip); // tripRoute.get('/api/v1/trips', auth.verifyToken, tripController.getTrips);

tripRoute.get('/api/v1/trips', _tripController["default"].getTrips);
tripRoute.put('/api/v1/trips/:tripId', _auth["default"].verifyToken, _tripController["default"].patchTrip); // tripRoute.get(
//   '/api/v1/trips/tripdest/',
//   auth.verifyToken,
//   tripController.destTrip
// );

var _default = tripRoute;
exports["default"] = _default;