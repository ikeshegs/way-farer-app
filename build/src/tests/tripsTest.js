"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe("All tests for create trip endpoint", function () {
  describe("POST api/v1/trips", function () {
    var userToken;
    before(function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
        email: 'ikeshegs@test.com',
        password: 'C00ljoe.'
      }).end(function (err, res) {
        var token = res.body.data.token;
        userToken = token;
        done(err);
      });
    });
    before(function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/bus').set('Authorization', "Bearer ".concat(userToken)).send({
        number_plate: 'ab765jkt',
        manufacturer: 'Toyota',
        model: 'Coastal',
        year: 2017,
        capacity: 30
      }).end(function (err, res) {
        done(err);
      });
    });
    it('It should return status 201 for a successful trip created', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        bus_id: 1,
        origin: 'Ibadan',
        destination: 'Lagos',
        trip_date: '2019-07-29',
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
        trip_date: '2019-07-29',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Bus ID is required');
        done();
      });
    });
    it('It should return status 400 for Bus ID TYPE !== Number', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        bus_id: 'hg',
        origin: 'Ibadan',
        destination: 'Lagos',
        trip_date: '2019-07-29',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Bus ID must be a Number');
        done();
      });
    });
    it('It should return status 400 for Bus Origin is required', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        bus_id: 45,
        destination: 'Lagos',
        trip_date: '2019-07-29',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Bus Origin is required');
        done();
      });
    });
    it('It should return status 400 for Bus Origin cannot be empty', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        bus_id: 45,
        origin: '',
        destination: 'Lagos',
        trip_date: '2019-07-29',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Bus Origin cannot be empty');
        done();
      });
    });
    it('It should return status 400 for Bus Origin cannot be a space', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        bus_id: 45,
        origin: ' ',
        destination: 'Lagos',
        trip_date: '2019-07-29',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Bus Origin cannot be a space');
        done();
      });
    });
    it('It should return status 400 for Bus destination is undefined', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        bus_id: 45,
        origin: 'Ibadan',
        trip_date: '2019-07-29',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Bus destination is required');
        done();
      });
    });
    it('It should return status 400 for Bus destination cannot be empty', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        bus_id: 45,
        origin: 'Ibadan',
        destination: '',
        trip_date: '2019-07-29',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Bus destination cannot be empty');
        done();
      });
    });
    it('It should return status 400 for Bus destination cannot be a space', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        bus_id: 45,
        origin: 'Ibadan',
        destination: ' ',
        trip_date: '2019-07-29',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Bus destination cannot be a space');
        done();
      });
    });
    it('It should return status 400 for Fare is required', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        bus_id: 45,
        origin: 'Ibadan',
        destination: 'Lagos',
        trip_date: '2019-07-29'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Fare is required');
        done();
      });
    });
    it('It should return status 400 for Fare is not equals to number', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        bus_id: 45,
        origin: 'Ibadan',
        destination: 'Lagos',
        trip_date: '2019-07-29',
        fare: '1200.00'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Fare must be a Number');
        done();
      });
    });
  });
  describe("POST api/v1/trips", function () {
    var userToken;
    before(function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
        email: 'rachael@test.com',
        password: 'rachyfran.'
      }).end(function (err, res) {
        var token = res.body.data.token;
        userToken = token;
        done(err);
      });
    });
    it('It should return status 403 for Forbidden access', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        bus_id: 1,
        origin: 'Ibadan',
        destination: 'Lagos',
        trip_date: '2019-07-29',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(403);
        expect(res.body.error).to.equal('Forbidden');
        done();
      });
    });
  });
  describe("POST api/v1/trips", function () {
    before(function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').send({
        email: 'rachael@test.com',
        password: 'rachyfran.'
      }).end(function (err, res) {
        done(err);
      });
    });
    it('It should return status 401 for Unauthorized access', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').send({
        bus_id: 45,
        origin: 'Ibadan',
        destination: 'Lagos',
        trip_date: '2019-07-29',
        fare: 1200.0
      }).end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body.error).to.equal('Unauthorized');
        done();
      });
    });
  });
});
describe("All tests for get trip endpoint", function () {
  describe("GET api/v1/trips", function () {
    var userToken;
    before(function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
        email: 'ikeshegs@test.com',
        password: 'C00ljoe.'
      }).end(function (err, res) {
        var token = res.body.data.token;
        userToken = token;
        done(err);
      });
    });
    it('The GET request should return status 200 for admin successfully viewing trip', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.data[0]).to.have.property('bus_id');
        expect(res.body.data[0]).to.have.property('trip_id');
        expect(res.body.data[0]).to.have.property('origin');
        expect(res.body.data[0]).to.have.property('destination');
        expect(res.body.data[0]).to.have.property('fare');
        expect(res.body.data[0]).to.have.property('trip_date');
        done();
      });
    });
  });
  describe("GET api/v1/trips", function () {
    before(function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
        email: 'rachael@test.com',
        password: 'rachyfran.'
      }).end(function (err, res) {
        done(err);
      });
    });
    it('The GET request should return status 401 for Unauthorized access', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/trips').end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body.error).to.equal('Unauthorized');
        done();
      });
    });
  });
  describe("GET api/v1/trips", function () {
    var userToken;
    before(function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
        email: 'rachael@test.com',
        password: 'rachyfran.'
      }).end(function (err, res) {
        userToken = 'token';
        done(err);
      });
    });
    it('The GET request should return status 403 for Forbidden access', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).end(function (err, res) {
        expect(res).to.have.status(403);
        expect(res.body.error).to.equal('Forbidden');
        done();
      });
    });
  });
});