import uuid from 'uuid/v4';
import pool from '../database/db';

class tripController {
  static createTrip(req, res) {
    const decodedUser = req.user;

    if (decodedUser.is_admin === true) {
      const { busId, origin, destination, tripDate, fare } = req.body;
      const trip = {
        trip_id: uuid(),
        bus_id: busId,
        origin,
        destination,
        trip_date: tripDate,
        fare
      };

      const query = {
        text:
          'INSERT INTO trips (trip_id, bus_id, origin, destination, trip_date, fare) VALUES ($1, $2, $3, $4, $5, $6) returning *',
        values: [
          trip.trip_id,
          trip.bus_id,
          trip.origin,
          trip.destination,
          trip.trip_date,
          trip.fare
        ]
      };

      pool.query(query, (error, data) => {
        if (error) {
          return res.status(400).send({
            status: 'error',
            error
          });
        }

        if (data) {
          return res.status(201).send({
            status: 'success',
            data: {
              trip_id: data.rows[0].trip_id,
              bus_id: data.rows[0].bus_id,
              origin: data.rows[0].origin,
              destination: data.rows[0].destination,
              trip_date: data.rows[0].trip_date,
              fare: data.rows[0].fare
            }
          });
        }
        return res.status(400).send({
          status: 'error',
          error: 'Unsuccessful'
        });
      });
    }
  }

  static getTrips(req, res) {
    const decodedUser = req.user;

    if (decodedUser) {
      const query = 'SELECT * FROM trips';

      pool.query(query, (error, data) => {
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

export default tripController;
