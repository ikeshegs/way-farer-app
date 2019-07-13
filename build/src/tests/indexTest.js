"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe("Test for the Homepage", function () {
  it("It should test to see if homepage loads", function (done) {
    _chai["default"].request(_index["default"]).get('/').end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Welcome to WayFarer app. A public bus transport booking app. 😀');
      done();
    });
  });
});