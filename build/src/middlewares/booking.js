"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable camelcase */
var bookingValidator =
/*#__PURE__*/
function () {
  function bookingValidator() {
    _classCallCheck(this, bookingValidator);
  }

  _createClass(bookingValidator, null, [{
    key: "createBookingValidator",
    value: function createBookingValidator(req, res, next) {
      var trip_id = req.body.trip_id;

      if (typeof trip_id === 'undefined') {
        return res.status(400).send({
          status: 'error',
          error: 'Trip ID field is required'
        });
      }

      if (trip_id === '') {
        return res.status(400).send({
          status: 'error',
          error: 'Trip ID field cannot be empty'
        });
      }

      if (typeof trip_id !== 'number') {
        return res.status(400).send({
          status: 'error',
          error: 'Trip ID must be a number.'
        });
      }

      return next();
    }
  }]);

  return bookingValidator;
}();

var _default = bookingValidator;
exports["default"] = _default;