/* eslint-disable camelcase */
import pool from '../database/db';

class tripController {
  static createTrip(req, res) {
    const decodedUser = req.user;

    if (decodedUser.isAdmin === true) {
      const {
        bus_id,
        origin,
        destination,
        trip_date,
        fare
      } = req.body;
      const trip = {
        bus_id,
        origin,
        destination,
        trip_date,
        fare
      };

      const query = {
        text: 'INSERT INTO trips (bus_id, origin, destination, trip_date, fare) VALUES ($1, $2, $3, $4, $5) returning *',
        values: [
          trip.bus_id,
          trip.origin,
          trip.destination,
          trip.trip_date,
          trip.fare
        ]
      };

      pool.query(query, (error, data) => {
        if (error) {
          return res.status(400).json({
            status: 'error',
            error
          });
        }

        if (data) {
          return res.status(201).json({
            status: 'success',
            data: {
              id: data.rows[0].id,
              bus_id: data.rows[0].bus_id,
              origin: data.rows[0].origin,
              destination: data.rows[0].destination,
              trip_date: data.rows[0].trip_date,
              fare: data.rows[0].fare
            }
          });
        }
        return res.status(400).json({
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
          return res.status(200).json({
            status: 'success',
            data: data.rows
          });
        }
      });
    }
  }

  static patchTrip(req, res) {
    const decodedUser = req.user;

    if (decodedUser.isAdmin === true) {
      if (Number.isNaN(req.params.tripId)) {
        return res.status(400).json({
          status: 'error',
          error: 'Invalid Booking ID'
        });
      }

      // Check if trip has already been cancelled
      const checkTrip = {
        text: "SELECT status FROM trips WHERE id = $1",
        values: [req.params.tripId]
      };

      pool.query(checkTrip, (error, data) => {
        if (data.rows[0].status === 'cancelled') {
          return res.status(409).json({
            status: 'error',
            error: 'Trip has already been cancelled'
          })
        }

        // Update Trip status to 'Cancelled'
        const patchQuery = {
          text: "UPDATE trips SET status = 'cancelled' WHERE id = $1",
          values: [req.params.tripId]
        };

        pool.query(patchQuery, (error, newData) => {
          if (newData) {
            return res.status(200).json({
              status: 'success',
              data: {
                message: 'Trip cancelled successfully'
              }
            });
          }
        });
      })
    }
  }

  // static destTrip(req, res) {
  //   const decodedUser = req.user;

  //   if (decodedUser) {
  //     const filterdestination = {
  //       text: 'SELECT * FROM trips WHERE destination = $1'
  //     };
  //   }
  // }
}

export default tripController;