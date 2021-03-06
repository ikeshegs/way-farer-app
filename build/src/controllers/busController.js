"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../database/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var busController =
/*#__PURE__*/
function () {
  function busController() {
    _classCallCheck(this, busController);
  }

  _createClass(busController, null, [{
    key: "createBus",
    value: function createBus(req, res) {
      var decodedUser = req.user;

      if (decodedUser.isAdmin === true) {
        var _req$body = req.body,
            number_plate = _req$body.number_plate,
            manufacturer = _req$body.manufacturer,
            model = _req$body.model,
            year = _req$body.year,
            capacity = _req$body.capacity;
        var bus = {
          number_plate: number_plate,
          manufacturer: manufacturer,
          model: model,
          year: year,
          capacity: capacity
        }; // Create account if no errors

        var query = {
          text: 'INSERT INTO buses (number_plate, manufacturer, model, year, capacity) VALUES ($1, $2, $3, $4, $5) returning *',
          values: [bus.number_plate, bus.manufacturer, bus.model, bus.year, bus.capacity]
        };

        _db["default"].query(query, function (error, data) {
          if (data) {
            return res.status(201).json({
              status: 'success',
              data: {
                bus_id: data.rows[0].id,
                message: "".concat(data.rows[0].manufacturer, " ").concat(data.rows[0].model, " created successfully")
              }
            });
          }

          return res.status(400).json({
            status: 'error',
            error: 'Error creating bus'
          });
        });
      }
    } // static getBuses(req, res) {
    //   const decodedUser = req.user;
    //   if (decodedUser.isAdmin === true) {
    //     const query = 'SELECT * FROM buses';
    //     pool.query(query, (error, data) => {
    //       if (error) {
    //         return res.status.json({
    //           status: 'error',
    //           error
    //         });
    //       }
    //       if (data.rows.length !== 0) {
    //         return res.status(200).json({
    //           status: 'success',
    //           data: data.rows
    //         });
    //       }
    //     });
    //   }
    // }

  }, {
    key: "getBuses",
    value: function getBuses(req, res) {
      // const decodedUser = req.user;
      var query = 'SELECT * FROM buses';

      _db["default"].query(query, function (error, data) {
        if (error) {
          return res.status.json({
            status: 'error',
            error: error
          });
        }

        if (data.rows.length !== 0) {
          return res.status(200).json({
            status: 'success',
            data: data.rows
          });
        }
      });
    }
  }]);

  return busController;
}();

var _default = busController;
exports["default"] = _default;