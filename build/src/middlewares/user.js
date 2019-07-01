"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("../database/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userValidator = {
  signupValidator: function signupValidator(req, res, next) {
    var _req$body = req.body,
        email = _req$body.email,
        firstname = _req$body.firstname,
        lastname = _req$body.lastname,
        password = _req$body.password; // Email Validation

    if (email === undefined) {
      return res.status(400).send({
        status: 400,
        message: 'Email field is required'
      });
    }

    if (email === '') {
      return res.status(400).send({
        status: 400,
        message: 'Email cannot be empty.'
      });
    }

    if (email.includes(' ')) {
      return res.status(400).send({
        status: 400,
        message: 'Email cannot include space.'
      });
    }

    if (typeof email !== 'string') {
      return res.status(400).send({
        status: 400,
        message: 'Email should be a string'
      });
    }

    var foundEmail = _users["default"].find(function (user) {
      return user.email === email;
    });

    if (foundEmail) {
      return res.status(409).send({
        status: 409,
        message: 'Email already exists!'
      });
    }

    var emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    if (!emailCheck.test(email)) {
      return res.status(400).send({
        status: 400,
        message: 'Email format is invalid'
      });
    }

    email = email.toLowerCase().trim();

    if (email.length < 5 || email.length > 30) {
      return res.status(400).send({
        status: 400,
        message: 'Email should be 10 to 30 characters long'
      });
    } // First name validation


    if (firstname === undefined) {
      return res.status(400).send({
        status: 400,
        message: 'Firstname field cannot is required'
      });
    }

    if (firstname === '') {
      return res.status(400).send({
        status: 400,
        message: 'Firstname field cannot be empty'
      });
    }

    if (typeof firstname !== 'string') {
      return res.status(400).send({
        status: 400,
        message: 'Firstname must be an alphabet'
      });
    }

    firstname = firstname.trim().replace(/\s\s+/g, ' ');

    if (firstname.length < 3 || firstname.length > 20) {
      return res.status(400).send({
        status: 400,
        message: 'First name should be 4 to 20 alphabets long'
      });
    }

    var validFirstNameCharacters = /^[a-zA-Z]+$/;

    if (!validFirstNameCharacters.test(firstname)) {
      return res.status(400).send({
        status: 400,
        message: 'First name accepts only alphabets'
      });
    } // Last name validation


    if (lastname === undefined) {
      return res.status(400).send({
        status: 400,
        message: 'Lastname field is required'
      });
    }

    if (lastname === '') {
      return res.status(400).send({
        status: 400,
        message: 'Lastname field cannot be empty'
      });
    }

    if (typeof lastname !== 'string') {
      return res.status(400).send({
        status: 400,
        message: 'Lastname must be a string'
      });
    } // lastname = lastname.trim().replace(/\s\s+/g, ' ');
    // if (lastname.length < 8 || lastname.length > 20) {
    //   return res.status(400).send({
    //     status: 400,
    //     message: 'Lastname should be between 8 to 20 alphabets long'
    //   });
    // }


    var validLastNameCharacters = /^[a-zA-Z]+$/;

    if (!validLastNameCharacters.test(lastname)) {
      return res.status(400).send({
        status: 400,
        message: 'Lastname accepts only alphabets'
      });
    } // Password Validation


    if (password === undefined) {
      return res.status(400).send({
        status: 400,
        message: 'Password field is required'
      });
    }

    if (password === '') {
      return res.status(400).send({
        status: 400,
        message: 'Password field cannot be empty'
      });
    }

    if (password === ' ') {
      return res.status(400).send({
        status: 400,
        message: 'Password cannot be a space'
      });
    }

    if (typeof password !== 'string') {
      return res.status(400).send({
        status: 400,
        message: 'Password should be a string'
      });
    }

    password = password.trim();

    if (password.length < 5 || password.length > 30) {
      return res.status(400).send({
        status: 400,
        message: 'Password should be 5 to 30 characters long'
      });
    }

    next();
  }
};
var _default = userValidator;
exports["default"] = _default;