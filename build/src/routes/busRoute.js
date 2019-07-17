"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../helpers/auth"));

var _busController = _interopRequireDefault(require("../controllers/busController"));

var _bus = _interopRequireDefault(require("../middlewares/bus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var busRoute = _express["default"].Router();

busRoute.post('/api/v1/bus', _auth["default"].verifyToken, _bus["default"].createBusValidator, _busController["default"].createBus); // busRoute.get('/api/v1/bus', auth.verifyToken, busController.getBuses);

var _default = busRoute;
exports["default"] = _default;