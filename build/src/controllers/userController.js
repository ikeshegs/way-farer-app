"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _auth = _interopRequireDefault(require("../helpers/auth"));

var _users = _interopRequireDefault(require("../database/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var salt = _bcrypt["default"].genSaltSync(10);

var userController =
/*#__PURE__*/
function () {
  function userController() {
    _classCallCheck(this, userController);
  }

  _createClass(userController, null, [{
    key: "createUser",
    value: function createUser(req, res) {
      var hash = _bcrypt["default"].hashSync(req.body.password, salt);

      var user = {
        id: _users["default"].length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
      }; // Create account if no errors

      _users["default"].push(user);

      var token = _auth["default"].createToken(user);

      return res.status(201).json({
        status: 201,
        message: 'Success: User created successfully',
        token: token
      });
    }
  }]);

  return userController;
}();

var _default = userController;
exports["default"] = _default;