"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_userRoute["default"]);
app.get('/', function (req, res) {
  return res.status(200).send('Welcome to WayFarer app. A public bus transport booking app.');
});
var PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('App is running on port', PORT);
var _default = app;
exports["default"] = _default;