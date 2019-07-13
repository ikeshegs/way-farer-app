/* eslint-disable no-case-declarations */
/* eslint-disable camelcase */
import pool from '../database/db';

class bookingController {
  static createBooking(req, res) {
    const decodedUser = req.user;
    if (decodedUser) {
      const { trip_id } = req.body;
      const booking = {
        trip_id,
        created_on: new Date()
      };

      const tripQuery = {
        text: 'SELECT bus_id, trip_date FROM trips WHERE trip_id = $1',
        values: [booking.trip_id]
      };

      pool.query(tripQuery, (error, data) => {
        if (data) {
          const bookingQuery = {
            text:
              'INSERT INTO bookings (user_id, trip_id, bus_id, trip_date, first_name, last_name, email, created_on) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *',
            values: [
              decodedUser.user_id,
              booking.trip_id,
              data.rows[0].bus_id,
              data.rows[0].trip_date,
              decodedUser.first_name,
              decodedUser.last_name,
              decodedUser.email,
              booking.created_on
            ]
          };
          pool.query(bookingQuery, (bookingError, bookingData) => {
            return res.status(201).send({
              status: 'success',
              data: {
                booking_id: bookingData.rows[0].booking_id,
                user_id: bookingData.rows[0].user_id,
                trip_id: bookingData.rows[0].trip_id,
                bus_id: bookingData.rows[0].bus_id,
                trip_date: bookingData.rows[0].trip_date,
                seat_number: bookingData.rows[0].seat_number,
                first_name: bookingData.rows[0].first_name,
                last_name: bookingData.rows[0].last_name,
                email: bookingData.rows[0].email
              }
            });
          });
        }
      });
    }
  }

  static getBooking(req, res) {
    const decodedUser = req.user;

    switch (decodedUser.is_admin) {
      case true:
        const adminQuery = 'SELECT * from bookings';

        pool.query(adminQuery, (error, data) => {
          return res.status(200).send({
            status: 'success',
            data: data.rows
          });
        });
        break;
      case false:
        const nonAdminQuery = {
          text: 'SELECT * FROM bookings WHERE user_id = $1',
          values: [decodedUser.user_id]
        };

        pool.query(nonAdminQuery, (error, data) => {
          return res.status(200).send({
            status: 'success',
            data: data.rows
          });
        });
        break;
      default:
        return res.status(200).send({
          status: 'error',
          error: 'Not Allowed'
        });
    }
  }

  static deleteBooking(req, res) {
    const decodedUser = req.user;

    if (decodedUser) {
      if (Number.isNaN(req.params.bookingId)) {
        return res.status(400).send({
          status: 'error',
          error: 'Invalid Booking ID'
        });
      }
      const deleteQuery = {
        text: 'DELETE FROM bookings WHERE booking_id = $1',
        values: [req.params.bookingId]
      };

      pool.query(deleteQuery, (error, data) => {
        if (data.rows.length === 0) {
          return res.status(200).send({
            success: 'success',
            data: {
              message: 'Booking deleted successfully'
            }
          });
        }
      });
    }
  }
}

export default bookingController;
