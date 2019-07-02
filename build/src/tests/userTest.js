"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe("All tests for signup endpoint", function () {
  describe("POST api/v1/auth/signup", function () {
    it("It should return status: 201 for successful signup", function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'ikeshegs@gmail.com',
        firstname: 'Ikechukwu',
        lastname: 'Okoro',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Success: User created successfully');
        expect(res.body).to.have.property('token');
        done();
      });
    });
    it('should return 400 status for undefined Firstname', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'shegshjgjhkgjhjh@gmail.com',
        lastname: 'Okoro',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Firstname field is required');
        done();
      });
    });
    it('should return 400 status for unstringed First Name', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'ikesheg@gmail.com',
        firstname: ['Ikechukwu'],
        lastname: 'Okoro',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Firstname must be an alphabet');
        done();
      });
    });
    it('should return 400 status for empty Firstname', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'ikesheglkjhgs@gmail.com',
        firstname: '',
        lastname: 'Okoro',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Firstname field cannot be empty');
        done();
      });
    });
    it('should return 400 status for invalid Firstname character', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'ikelggjkhhjshegs@gmail.com',
        firstname: 'Ikec#ukwu',
        lastname: 'Okoro',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Firstname accepts only alphabets');
        done();
      });
    }); // LastName Tests

    it('should return 400 status for undefined Lastname', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'ikeshkhjhegs@gmail.com',
        firstname: 'Ikechukwu',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Lastname field is required');
        done();
      });
    });
    it('should return 400 status for unstringed Lastname', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'ikeghjkjbjkshegs@gmail.com',
        firstname: 'Ikechukwu',
        lastname: ['Okoro'],
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Lastname must be a string');
        done();
      });
    });
    it('should return 400 status for empty Lastname', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'ikeskvjhjhegs@gmail.com',
        firstname: 'Ikechukwu',
        lastname: '',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Lastname field cannot be empty');
        done();
      });
    });
    it('should return 400 status for invalid Lastname character', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'ikekvhvhjshegs@gmail.com',
        firstname: 'Ikechukwu',
        lastname: 'Oko00ro',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Lastname accepts only alphabets');
        done();
      });
    }); // Email Tests

    it('should return 400 status for an undefined Email', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        firstname: 'Ikechukwu',
        lastname: 'Okoro',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Email field is required');
        done();
      });
    });
    it('should return 400 status for an unstringed Email', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: ['ikeshelbjkjkbngs@gmail.com'],
        firstname: 'Ikechukwu',
        lastname: 'Okoro',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('Email should be a string');
        done();
      });
    });
    it('should return 400 status for empty Email Field', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: '',
        firstname: 'Ikechukwu',
        lastname: 'Okoro',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Email cannot be empty.');
        done();
      });
    }); // Password Tests

    it('should return 400 status for undefined Password', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'ikesjhjhskjdgghegs@gmail.com',
        firstname: 'Ikechukwu',
        lastname: 'Okoro'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Password field is required');
        done();
      });
    });
    it('should return 400 status for empty Password Field', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'fgsdfikeshegs@gmail.com',
        firstname: 'Ikechukwu',
        lastname: 'Okoro',
        password: ''
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Password field cannot be empty');
        done();
      });
    });
    it('should return 400 status for an unstringed Password', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'fgsdfgikeshegs@gmail.com',
        firstname: 'Ikechukwu',
        lastname: 'Okoro',
        password: ['shegsjhbejk']
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Password should be a string');
        done();
      });
    });
    it('should return 400 status for White space Password', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'fgsfgsdfgikeshegs@gmail.com',
        firstname: 'Ikechukwu',
        lastname: 'Okoro',
        password: ' '
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Password cannot be a space');
        done();
      });
    });
  });
});