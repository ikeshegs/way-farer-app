"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe("All tests for create trip endpoint", function () {
  var userToken;
  before(function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
      email: 'kindness@gmail.com',
      password: 'ansemiosaro'
    }).end(function (err, res) {
      var token = res.body.data.token;
      userToken = token;
      done(err);
    });
  });
  describe("POST api/v1/trips", function () {
    it('It should return status 201 for a successful trip created', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        busId: 45,
        origin: 'Ibadan',
        destination: 'Lagos',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(201);
        expect(res.body.data).to.have.property('bus_id');
        expect(res.body.data).to.have.property('trip_id');
        expect(res.body.data).to.have.property('origin');
        expect(res.body.data).to.have.property('destination');
        expect(res.body.data).to.have.property('fare');
        expect(res.body.data).to.have.property('trip_date');
        done();
      });
    });
    it('It should return status 400 for empty Bus ID value', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        origin: 'Ibadan',
        destination: 'Lagos',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Bus ID is required');
        done();
      });
    });
    it('It should return status 400 for Bus ID TYPE !== Number', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        busId: '45',
        origin: 'Ibadan',
        destination: 'Lagos',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Bus ID must be a Number');
        done();
      });
    });
    it('It should return status 400 for Bus Origin is required', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        busId: 45,
        destination: 'Lagos',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Bus Origin is required');
        done();
      });
    });
    it('It should return status 400 for Bus Origin cannot be empty', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        busId: 45,
        origin: '',
        destination: 'Lagos',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Bus Origin cannot be empty');
        done();
      });
    });
    it('It should return status 400 for Bus Origin cannot be a space', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        busId: 45,
        origin: ' ',
        destination: 'Lagos',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Bus Origin cannot be a space');
        done();
      });
    });
    it('It should return status 400 for Bus destination is undefined', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        busId: 45,
        origin: 'Ibadan',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Bus destination is required');
        done();
      });
    });
    it('It should return status 400 for Bus destination cannot be empty', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        busId: 45,
        origin: 'Ibadan',
        destination: '',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Bus destination cannot be empty');
        done();
      });
    });
    it('It should return status 400 for Bus destination cannot be a space', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        busId: 45,
        origin: 'Ibadan',
        destination: ' ',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Bus destination cannot be a space');
        done();
      });
    });
    it('It should return status 400 for Fare is required', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        busId: 45,
        origin: 'Ibadan',
        destination: 'Lagos'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Fare is required');
        done();
      });
    });
    it('It should return status 400 for Fare is not equals to number', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        busId: 45,
        origin: 'Ibadan',
        destination: 'Lagos',
        fare: '1200.00'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Fare must be a Number');
        done();
      });
    });
  });
});