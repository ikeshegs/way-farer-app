"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe('All tests for bookings endpoint', function () {
  describe('POST api/v1/bookings', function () {
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
        numberPlate: 'ab765jkt',
        manufacturer: 'Toyota',
        model: 'Coastal',
        year: 2017,
        capacity: 30
      }).end(function (err, res) {
        done(err);
      });
    });
    before(function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        bus_id: 3,
        origin: 'Aba',
        destination: 'Owerri',
        trip_date: '2019-07-29',
        fare: 5000.0
      }).end(function (err, res) {
        done(err);
      });
    });
    it('It should return status 201 for a successful booking', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/bookings').set('Authorization', "Bearer ".concat(userToken)).send({
        trip_id: 1
      }).end(function (err, res) {
        expect(res.body.data).to.have.property('booking_id');
        expect(res.body.data).to.have.property('bus_id');
        expect(res.body.data).to.have.property('trip_id');
        expect(res.body.data).to.have.property('bus_id');
        expect(res.body.data).to.have.property('trip_date');
        expect(res.body.data).to.have.property('seat_number');
        expect(res.body.data).to.have.property('first_name');
        expect(res.body.data).to.have.property('last_name');
        expect(res.body.data).to.have.property('email');
        done();
      });
    });
  });
});
describe('All tests for view bookings endpoint', function () {
  describe('POST api/v1/bookings', function () {
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
        numberPlate: 'ab765jkt',
        manufacturer: 'Toyota',
        model: 'Coastal',
        year: 2017,
        capacity: 30
      }).end(function (err, res) {
        done(err);
      });
    });
    before(function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        bus_id: 3,
        origin: 'Aba',
        destination: 'Owerri',
        trip_date: '2019-07-29',
        fare: 5000.0
      }).end(function (err, res) {
        done(err);
      });
    });
    before(function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/bookings').set('Authorization', "Bearer ".concat(userToken)).send({
        trip_id: 1
      }).end(function (err, res) {
        done(err);
      });
    });
    it('It should return status 200 for a ADMIN successfully viewing all bookings', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/bookings').set('Authorization', "Bearer ".concat(userToken)).send({
        trip_id: 1
      }).end(function (err, res) {
        expect(res.body.data[0]).to.have.property('booking_id');
        expect(res.body.data[0]).to.have.property('bus_id');
        expect(res.body.data[0]).to.have.property('trip_id');
        expect(res.body.data[0]).to.have.property('bus_id');
        expect(res.body.data[0]).to.have.property('trip_date');
        expect(res.body.data[0]).to.have.property('seat_number');
        expect(res.body.data[0]).to.have.property('first_name');
        expect(res.body.data[0]).to.have.property('last_name');
        expect(res.body.data[0]).to.have.property('email');
        done();
      });
    });
  });
});
describe('All tests for deleting a booking endpoint', function () {
  describe('DELETE api/v1/bookings', function () {
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
        numberPlate: 'ab765jkt',
        manufacturer: 'Toyota',
        model: 'Coastal',
        year: 2017,
        capacity: 30
      }).end(function (err, res) {
        done(err);
      });
    });
    before(function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(userToken)).send({
        bus_id: 3,
        origin: 'Aba',
        destination: 'Owerri',
        trip_date: '2019-07-29',
        fare: 5000.0
      }).end(function (err, res) {
        done(err);
      });
    });
    before(function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/bookings').set('Authorization', "Bearer ".concat(userToken)).send({
        trip_id: 1
      }).end(function (err, res) {
        done(err);
      });
    });
    it('It should return status 200, when a user successfully deletes a booking', function (done) {
      _chai["default"].request(_index["default"])["delete"]('/api/v1/bookings/1').set('Authorization', "Bearer ".concat(userToken)).end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.data).to.have.property('message');
        expect(res.body.data.message).to.equal('Booking deleted successfully');
        done();
      });
    });
  });
});