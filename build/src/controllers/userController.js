"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _auth = _interopRequireDefault(require("../helpers/auth"));

var _usersDB = _interopRequireDefault(require("../database/usersDB"));

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
      var existingUser = _usersDB["default"].query('SELECT * FROM users WHERE email = $1;', [req.body.email]);

      if (existingUser.rowCount) {
        res.status(409).send({
          status: 'error',
          error: 'Email already exist'
        });
      }

      var hash = _bcrypt["default"].hashSync(req.body.password, salt, function (err, result) {
        if (err) {
          return err;
        }

        return result;
      });

      var user = {
        user_id: (0, _v["default"])(),
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        password: hash,
        is_admin: false
      }; // Create account if no errors

      var query = {
        text: 'INSERT INTO users (user_id, first_name, last_name, email, password, is_admin) VALUES ($1, $2, $3, $4, $5, $6) returning *',
        values: [user.user_id, user.first_name, user.last_name, user.email, user.password, user.is_admin]
      };

      var token = _auth["default"].createToken(user);

      _usersDB["default"].query(query, function (error, data) {
        console.log('data', data);

        if (data) {
          return res.status(201).send({
            status: 'success',
            data: {
              user_id: data.rows[0].user_id,
              is_admin: data.rows[0].is_admin,
              token: token
            }
          });
        }

        return res.status(400).send({
          status: 'error',
          error: error
        });
      });
    }
  }, {
    key: "userSignup",
    value: function userSignup(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;
      var foundUser = users.find(function (user) {
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
        status: 'error',
        error: 'Authentication Failed'
      });
    }
  }, {
    key: "getUsers",
    value: function getUsers(req, res) {
      var decodedUser = req.user;

      if (decodedUser.is_admin === true) {
        var filterUser = users.filter(function (user) {
          return user;
        });
        return res.status(200).send({
          status: 'success',
          data: filterUser
        });
      }

      return res.status(401).send({
        status: 'error',
        error: 'Unauthorized'
      });
    }
  }]);

  return userController;
}();

var _default = userController;
exports["default"] = _default;