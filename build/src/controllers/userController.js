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
      var hash = _bcrypt["default"].hashSync(req.body.password, salt, function (err, result) {
        if (err) {
          return err;
        }

        return result;
      });

      var user = {
        id: _users["default"].length + 1,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: hash,
        is_admin: false
      }; // Create account if no errors

      _users["default"].push(user);

      var token = _auth["default"].createToken(user);

      return res.status(201).json({
        status: 'success',
        data: {
          user_id: user.id,
          is_admin: user.is_admin,
          token: token
        }
      });
    }
  }, {
    key: "userSignup",
    value: function userSignup(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;

      var foundUser = _users["default"].find(function (user) {
        return user.email === email;
      });

      if (!foundUser) {
        return res.status(400).send({
          status: 'error',
          error: 'No user in the database'
        });
      }

      var comparePassword = _bcrypt["default"].compareSync(password, foundUser.password);

      if (comparePassword) {
        var token = _auth["default"].createToken(foundUser);

        return res.status(200).json({
          status: 'success',
          data: {
            user_id: foundUser.id,
            is_admin: foundUser.is_admin,
            token: token
          }
        });
      }

      return res.status(400).json({
        status: 400,
        error: 'Authentication Failed'
      });
    }
  }, {
    key: "getUsers",
    value: function getUsers(req, res) {
      var filterUser = _users["default"].filter(function (user) {
        return user;
      });

      return res.status(200).send({
        status: 200,
        data: [filterUser]
      });
    }
  }]);

  return userController;
}();

var _default = userController;
exports["default"] = _default;