"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var userValidator =
/*#__PURE__*/
function () {
  function userValidator() {
    _classCallCheck(this, userValidator);
  }

  _createClass(userValidator, null, [{
    key: "signupValidator",
    value: function signupValidator(req, res, next) {
      var _req$body = req.body,
          email = _req$body.email,
          firstname = _req$body.firstname,
          lastname = _req$body.lastname,
          password = _req$body.password; // Email Validation

      if (email === undefined) {
        return res.status(400).send({
          status: 'error',
          error: 'Email field is required'
        });
      }

      if (email === '') {
        return res.status(400).send({
          status: 'error',
          error: 'Email cannot be empty.'
        });
      }

      if (email.includes(' ')) {
        return res.status(400).send({
          status: 'error',
          error: 'Email cannot include space.'
        });
      }

      var emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

      if (!emailCheck.test(email)) {
        return res.status(400).send({
          status: 'error',
          error: 'Email format is invalid'
        });
      }

      email = email.toLowerCase().trim();

      if (email.length < 5 || email.length > 30) {
        return res.status(400).send({
          status: 'error',
          error: 'Email should be 5 to 30 characters long'
        });
      } // First name validation


      if (firstname === undefined) {
        return res.status(400).send({
          status: 'error',
          error: 'Firstname field is required'
        });
      }

      if (firstname === '') {
        return res.status(400).send({
          status: 'error',
          error: 'Firstname field cannot be empty'
        });
      }

      if (typeof firstname !== 'string') {
        return res.status(400).send({
          status: 'error',
          error: 'Firstname must be an alphabet'
        });
      }

      var validFirstNameCharacters = /^[a-zA-Z]+$/;

      if (!validFirstNameCharacters.test(firstname)) {
        return res.status(400).send({
          status: 'error',
          error: 'Firstname accepts only alphabets'
        });
      } // Last name validation


      if (lastname === undefined) {
        return res.status(400).send({
          status: 'error',
          error: 'Lastname field is required'
        });
      }

      if (lastname === '') {
        return res.status(400).send({
          status: 'error',
          error: 'Lastname field cannot be empty'
        });
      }

      if (typeof lastname !== 'string') {
        return res.status(400).send({
          status: 'error',
          error: 'Lastname must be a string'
        });
      }

      var validLastNameCharacters = /^[a-zA-Z]+$/;

      if (!validLastNameCharacters.test(lastname)) {
        return res.status(400).send({
          status: 'error',
          error: 'Lastname accepts only alphabets'
        });
      } // Password Validation


      if (password === undefined) {
        return res.status(400).send({
          status: 'error',
          error: 'Password field is required'
        });
      }

      if (password === '') {
        return res.status(400).send({
          status: 'error',
          error: 'Password field cannot be empty'
        });
      }

      if (password === ' ') {
        return res.status(400).send({
          status: 'error',
          error: 'Password cannot be a space'
        });
      }

      password = password.trim();

      if (password.length < 8 || password.length > 30) {
        return res.status(400).send({
          status: 'error',
          error: 'Password should be 8 to 30 characters long'
        });
      }

      next();
    }
  }, {
    key: "loginValidator",
    value: function loginValidator(req, res, next) {
      // eslint-disable-next-line prefer-const
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      if (email === undefined) {
        return res.status(400).send({
          status: 'error',
          error: 'Email field cannot be empty'
        });
      }

      if (email === '') {
        return res.status(400).send({
          status: 'error',
          error: 'Email field cannot be empty.'
        });
      }

      if (typeof email !== 'string') {
        return res.status(400).send({
          status: 'error',
          error: 'Email should be a string'
        });
      }

      if (email.includes(' ')) {
        return res.status(400).send({
          status: 'error',
          error: 'Email cannot include space.'
        });
      }

      var emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

      if (!emailCheck.test(email)) {
        return res.status(400).send({
          status: 'error',
          error: 'Email format is invalid'
        });
      } // Password Validation


      if (password === undefined) {
        return res.status(400).send({
          status: 'error',
          error: 'Password field cannot be empty'
        });
      }

      if (password === '') {
        return res.status(400).send({
          status: 'error',
          error: 'Password field cannot be empty'
        });
      }

      if (password === ' ') {
        return res.status(400).send({
          status: 'error',
          error: 'Password cannot be a space'
        });
      }

      password = password.trim();

      if (password.length < 8 || password.length > 30) {
        return res.status(400).send({
          status: 'error',
          error: 'Password should be 8 to 30 characters long'
        });
      }

      return next();
    }
  }]);

  return userValidator;
}();

var _default = userValidator;
exports["default"] = _default;