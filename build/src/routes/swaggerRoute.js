"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _yamljs = _interopRequireDefault(require("yamljs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var swaggerRoute = (0, _express["default"])();

var swaggerDoc = _yamljs["default"].load("".concat(__dirname, "/../docs/doc.yaml")); // use swagger-Ui-express for your app documentation endpoint


swaggerRoute.use('/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerDoc));
var _default = swaggerRoute;
exports["default"] = _default;