"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _auth = _interopRequireDefault(require("../helpers/auth"));

var _db = _interopRequireDefault(require("../database/db"));

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
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hash,
        is_admin: req.body.is_admin || false
      }; // Create account if no errors

      var userQuery = {
        text: 'INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES ($1, $2, $3, $4, $5) returning *',
        values: [user.first_name, user.last_name, user.email, user.password, user.is_admin]
      };

      _db["default"].query(userQuery, function (error, data) {
        // Create user Signup Token
        var token = _auth["default"].createToken(data.rows[0]);

        if (data) {
          return res.status(201).json({
            status: 'success',
            data: {
              user_id: data.rows[0].id,
              is_admin: data.rows[0].is_admin,
              token: token
            }
          });
        }

        if (error.routine === '_bt_check_unique') {
          res.status(409).json({
            status: 'error',
            error: 'Email already exist'
          });
        }
      });
    }
  }, {
    key: "userSignin",
    value: function userSignin(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;
      var query = {
        text: 'SELECT id, first_name, last_name, email, password, is_admin FROM users WHERE email = $1',
        values: [email]
      };

      _db["default"].query(query, function (error, data) {
        if (data.rows.length === 0) {
          return res.status(404).json({
            status: 'error',
            error: 'No user in the database'
          });
        }

        if (data) {
          var comparePassword = _bcrypt["default"].compareSync(password, data.rows[0].password);

          if (comparePassword) {
            var token = _auth["default"].createToken(data.rows[0]);

            return res.status(200).json({
              status: 'success',
              data: {
                user_id: data.rows[0].id,
                is_admin: data.rows[0].is_admin,
                token: token
              }
            });
          }

          return res.status(400).json({
            status: 'error',
            error: 'Invalid Credentials'
          });
        }
      });
    } // static getUsers(req, res) {
    //   const decodedUser = req.user;
    //   if (decodedUser.isAdmin === true) {
    //     const query = 'SELECT * FROM users';
    //     pool.query(query, (error, data) => {
    //       if (data.rows.length !== 0) {
    //         return res.status(200).json({
    //           status: 'success',
    //           data: data.rows
    //         });
    //       }
    //     });
    //   }
    // }

  }, {
    key: "getUsers",
    value: function getUsers(req, res) {
      // const decodedUser = req.user;
      var query = 'SELECT * FROM users';

      _db["default"].query(query, function (error, data) {
        if (data.rows.length !== 0) {
          return res.status(200).json({
            status: 'success',
            data: data.rows
          });
        }
      });
    }
  }]);

  return userController;
}();

var _default = userController;
exports["default"] = _default;