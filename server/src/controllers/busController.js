/* eslint-disable camelcase */
import pool from '../database/db';

class busController {
  static createBus(req, res) {
    const decodedUser = req.user;

    if (decodedUser.is_admin === true) {
      const { number_plate, manufacturer, model, year, capacity } = req.body;

      const bus = {
        number_plate,
        manufacturer,
        model,
        year,
        capacity
      };

      // Create account if no errors
      const query = {
        text:
          'INSERT INTO buses (number_plate, manufacturer, model, year, capacity) VALUES ($1, $2, $3, $4, $5) returning *',
        values: [
          bus.number_plate,
          bus.manufacturer,
          bus.model,
          bus.year,
          bus.capacity
        ]
      };

      pool.query(query, (error, data) => {
        if (data) {
          return res.status(201).send({
            status: 'success',
            data: {
              bus_id: data.rows[0].bus_id,
              message: `${data.rows[0].manufacturer} ${data.rows[0].model} created successfully`
            }
          });
        }
        return res.status(400).send({
          status: 'error',
          error: 'Error creating bus'
        });
      });
    }
  }

  static getBuses(req, res) {
    const decodedUser = req.user;

    if (decodedUser.is_admin === true) {
      const query = 'SELECT * FROM buses';

      pool.query(query, (error, data) => {
        if (error) {
          return res.status.send({
            status: 'error',
            error
          });
        }

        if (data.rows.length !== 0) {
          return res.status(200).send({
            status: 'success',
            data: data.rows
          });
        }
      });
    }
  }
}

export default busController;
