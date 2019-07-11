/* eslint-disable camelcase */
import pool from '../database/db';

class bookingController {
  static createBooking(req, res) {
    const decodedUser = req.user;
    if (decodedUser) {
      const { trip_id, seat_number } = req.body;
      const booking = {
        user_id: decodedUser.user_id,
        trip_id,
        is_admin: decodedUser.is_admin,
        seat_number,
        created_on: new Date()
      };

      const query = {
        text:
          'INSERT INTO bookings (user_id, trip_id, seat_number, created_on) VALUES ($1, $2, $3, $4) returning *',
        values: [
          booking.user_id,
          booking.trip_id,
          booking.seat_number,
          booking.created_on
        ]
      };

      pool.query(query, (error, data) => {
        console.log('error', error);
        if (data) {
          const query2 = {
            text: 'SELECT * FROM trips WHERE trip_id = $1',
            values: [trip_id]
          };
          pool.query(query2, (err, result) => {
            return res.status(201).send({
              status: 'success',
              data: {
                booking_id: data.rows[0].booking_id,
                user_id: data.rows[0].user_id,
                trip_id: data.rows[0].trip_id,
                bus_id: result.rows[0].trip_id,
                trip_date: result.rows[0].trip_date,
                seat_number: data.rows[0].seat_number,
                first_name: decodedUser.first_name,
                last_name: decodedUser.last_name,
                email: decodedUser.email
              }
            });
          });
        }
      });
    }
  }
}

export default bookingController;
