"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable camelcase */
var busValidator =
/*#__PURE__*/
function () {
  function busValidator() {
    _classCallCheck(this, busValidator);
  }

  _createClass(busValidator, null, [{
    key: "createBusValidator",
    value: function createBusValidator(req, res, next) {
      var _req$body = req.body,
          number_plate = _req$body.number_plate,
          manufacturer = _req$body.manufacturer,
          model = _req$body.model,
          year = _req$body.year,
          capacity = _req$body.capacity; // Email Validation

      if (number_plate === undefined) {
        return res.status(400).send({
          status: 'error',
          error: 'Number Plate field is required'
        });
      }

      if (number_plate === '') {
        return res.status(400).send({
          status: 'error',
          error: 'Number Plate cannot be empty.'
        });
      }

      if (manufacturer === undefined) {
        return res.status(400).send({
          status: 'error',
          error: 'Manufacturer field is required'
        });
      }

      if (manufacturer === '') {
        return res.status(400).send({
          status: 'error',
          error: 'Manufacturer field cannot be empty'
        });
      }

      if (typeof manufacturer !== 'string') {
        return res.status(400).send({
          status: 'error',
          error: 'Manufacturer must be an alphabet'
        });
      }

      var validManufacturersCharacters = /^[a-zA-Z]/;

      if (!validManufacturersCharacters.test(manufacturer)) {
        return res.status(400).send({
          status: 'error',
          error: 'Manufacturer accepts only alphabetical characters'
        });
      }

      if (model === undefined) {
        return res.status(400).send({
          status: 'error',
          error: 'Model field is required'
        });
      }

      if (model === '') {
        return res.status(400).send({
          status: 'error',
          error: 'model field cannot be empty'
        });
      }

      var validModelCharacters = /^[a-zA-Z0-9]+$/;

      if (!validModelCharacters.test(model)) {
        return res.status(400).send({
          status: 'error',
          error: 'Model accepts only Alphanumeric Characters'
        });
      }

      if (year === undefined) {
        return res.status(400).send({
          status: 'error',
          error: 'Year field is required'
        });
      }

      if (year === '') {
        return res.status(400).send({
          status: 'error',
          error: 'Year field cannot be empty'
        });
      }

      if (year === ' ') {
        return res.status(400).send({
          status: 'error',
          error: 'Year cannot be a space'
        });
      }

      var validYearCharacters = /^[0-9]+$/;

      if (!validYearCharacters.test(year)) {
        return res.status(400).send({
          status: 'error',
          error: 'Year accepts only Alphanumeric Characters'
        });
      } // year = year.trim();


      if (year.length > 3 && year.length < 5) {
        return res.status(400).send({
          status: 'error',
          error: 'Year should be 4 characters long'
        });
      }

      if (capacity === undefined) {
        return res.status(400).send({
          status: 'error',
          error: 'Capacity field is required'
        });
      }

      if (capacity === '') {
        return res.status(400).send({
          status: 'error',
          error: 'Capacity field cannot be empty'
        });
      }

      if (capacity === ' ') {
        return res.status(400).send({
          status: 'error',
          error: 'Capacity cannot be a space'
        });
      } // year = year.trim();


      if (typeof capacity !== 'number') {
        return res.status(400).send({
          status: 'error',
          error: 'Year must ba a number'
        });
      }

      next();
    }
  }]);

  return busValidator;
}();

var _default = busValidator;
exports["default"] = _default;