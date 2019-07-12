/* eslint-disable camelcase */
import pool from '../database/db';

class bookingController {
  static createBooking(req, res) {
    const decodedUser = req.user;
    if (decodedUser) {
      const { trip_id, bus_id, trip_date, seat_number } = req.body;
      const booking = {
        user_id: decodedUser.user_id,
        trip_id,
        bus_id,
        trip_date,
        is_admin: decodedUser.is_admin,
        seat_number,
        created_on: new Date()
      };

      const query = {
        text:
          'INSERT INTO bookings (user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email, created_on) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *',
        values: [
          booking.user_id,
          booking.trip_id,
          booking.bus_id,
          booking.trip_date,
          booking.seat_number,
          decodedUser.first_name,
          decodedUser.last_name,
          decodedUser.email,
          booking.created_on
        ]
      };

      pool.query(query, (error, data) => {
        if (data) {
          return res.status(201).send({
            status: 'success',
            data: {
              booking_id: data.rows[0].booking_id,
              user_id: data.rows[0].user_id,
              trip_id: data.rows[0].trip_id,
              bus_id: data.rows[0].bus_id,
              trip_date: data.rows[0].trip_date,
              seat_number: data.rows[0].seat_number,
              first_name: data.rows[0].first_name,
              last_name: data.rows[0].last_name,
              email: data.rows[0].email
            }
          });
        }
        return res.status(400).send({
          status: 'error',
          error: 'Booking was not successful'
        });
      });
    }
  }
}

export default bookingController;
