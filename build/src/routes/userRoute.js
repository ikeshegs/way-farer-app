"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../middlewares/user"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _auth = _interopRequireDefault(require("../helpers/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Set Router
var userRoute = _express["default"].Router();

userRoute.post('/api/v1/auth/signup', _user["default"].signupValidator, _userController["default"].createUser);
userRoute.post('/api/v1/auth/signin', _user["default"].loginValidator, _userController["default"].userSignin); // userRoute.get('/api/v1/users', auth.verifyToken, userController.getUsers);

var _default = userRoute;
exports["default"] = _default;