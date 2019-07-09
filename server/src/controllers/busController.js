import uuid from 'uuid/v4';
import pool from '../database/db';
// import auth from '../helpers/auth';

class userController {
  static createBus(req, res) {
    const decodedUser = req.user;

    if (decodedUser.is_admin === true) {
      const { numberPlate, manufacturer, model, year, capacity } = req.body;

      const bus = {
        bus_id: uuid(),
        number_plate: numberPlate,
        manufacturer,
        model,
        year,
        capacity
      };

      // Create account if no errors
      const query = {
        text:
          'INSERT INTO buses (bus_id, number_plate, manufacturer, model, year, capacity) VALUES ($1, $2, $3, $4, $5, $6) returning *',
        values: [
          bus.bus_id,
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
        console.log('data', data);

        if (data.rows.length !== 0) {
          return res.status(200).send({
            status: 'success',
            data: [data.rows]
          });
        }
      });
    }
    return res.status(401).send({
      status: 'error',
      error: 'Unauthorized'
    });
  }
}

export default userController;
