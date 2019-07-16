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

tripRoute.post('/trips', _auth["default"].verifyToken, _trip["default"].createTripValidator, _tripController["default"].createTrip);
tripRoute.get('/trips', _auth["default"].verifyToken, _tripController["default"].getTrips);
tripRoute.patch('/trips/:tripId', _auth["default"].verifyToken, _tripController["default"].patchTrip);
tripRoute.get('/trips/tripdest/', _auth["default"].verifyToken, _tripController["default"].destTrip);
var _default = tripRoute;
exports["default"] = _default;