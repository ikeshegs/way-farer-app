"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var tripValidator =
/*#__PURE__*/
function () {
  function tripValidator() {
    _classCallCheck(this, tripValidator);
  }

  _createClass(tripValidator, null, [{
    key: "createTripValidator",
    value: function createTripValidator(req, res, next) {
      var _req$body = req.body,
          busId = _req$body.busId,
          origin = _req$body.origin,
          destination = _req$body.destination,
          fare = _req$body.fare;

      if (busId === undefined) {
        return res.status(400).send({
          status: 'error',
          error: 'Bus ID is required'
        });
      }

      if (typeof busId !== 'number') {
        return res.status(400).send({
          status: 'error',
          error: 'Bus ID must be a Number'
        });
      }

      if (origin === undefined) {
        return res.status(400).send({
          status: 'error',
          error: 'Bus Origin is required'
        });
      }

      if (origin === '') {
        return res.status(400).send({
          status: 'error',
          error: 'Bus Origin cannot be empty'
        });
      }

      if (origin === ' ') {
        return res.status(400).send({
          status: 'error',
          error: 'Bus Origin cannot be a space'
        });
      }

      if (destination === undefined) {
        return res.status(400).send({
          status: 'error',
          error: 'Bus destination is required'
        });
      }

      if (destination === '') {
        return res.status(400).send({
          status: 'error',
          error: 'Bus destination cannot be empty'
        });
      }

      if (destination === ' ') {
        return res.status(400).send({
          status: 'error',
          error: 'Bus destination cannot be a space'
        });
      }

      if (fare === undefined) {
        return res.status(400).send({
          status: 'error',
          error: 'Fare is required'
        });
      }

      if (typeof fare !== 'number') {
        return res.status(400).send({
          status: 'error',
          error: 'Fare must be a Number'
        });
      }

      next();
    }
  }]);

  return tripValidator;
}();

var _default = tripValidator;
exports["default"] = _default;