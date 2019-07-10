"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

require("regenerator-runtime/runtime");

require("core-js");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _swaggerRoute = _interopRequireDefault(require("./routes/swaggerRoute"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

var _tripRoute = _interopRequireDefault(require("./routes/tripRoute"));

var _busRoute = _interopRequireDefault(require("./routes/busRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Routes
_dotenv["default"].config();

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_swaggerRoute["default"]);
app.use(_userRoute["default"]);
app.use(_tripRoute["default"]);
app.use(_busRoute["default"]);
app.get('/', function (req, res) {
  return res.status(200).send('Welcome to WayFarer App. A public bus transport booking app. 😀');
});
var PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('App is running on port', PORT);
var _default = app;
exports["default"] = _default;