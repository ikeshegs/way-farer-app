/* eslint-disable no-case-declarations */
/* eslint-disable camelcase */
import pool from '../database/db';

class bookingController {
  static createBooking(req, res) {
    const decodedUser = req.user;
    if (decodedUser) {
      const {
        trip_id
      } = req.body;

      const booking = {
        trip_id,
        created_on: new Date()
      };

      // get user details
      const getUser = {
        text: 'SELECT first_name, last_name, email FROM users WHERE id = $1',
        values: [decodedUser.id]
      }
      pool.query(getUser, (err, userData) => {
        if (userData) {
          // Get bus_id & trip_date from trips table using trip_id
          const tripQuery = {
            text: 'SELECT bus_id, trip_date FROM trips WHERE id = $1',
            values: [booking.trip_id]
          };
          pool.query(tripQuery, (error, data) => {
            // Check Bus Sitting Capacity
            const busSeatCapacity = {
              text: 'SELECT capacity from buses WHERE id = $1',
              values: [data.rows[0].bus_id]
            }

            pool.query(busSeatCapacity, (err, busCapacity) => {

              // Check for current bookings per trip
              const currentBookings = {
                text: 'SELECT * FROM bookings WHERE trip_id = $1',
                values: [booking.trip_id]
              }
              pool.query(currentBookings, (currentBookingError, currentBookingData) => {
                if (currentBookingData.rowCount < busCapacity.rows[0].capacity) {
                  // Get all bookings where trip_id = $1
                  const seatNumberQuery = {
                    text: 'SELECT * FROM bookings where trip_id = $1',
                    values: [booking.trip_id]
                  };
                  pool.query(seatNumberQuery, (seatNumberError, seatNumberData) => {
                    let seatNumber;
                    if (seatNumberData.rowCount !== 0) {
                      seatNumber = seatNumberData.rowCount;
                      seatNumber += 1;
                    } else {
                      seatNumber = 1;
                    }
                    const bookingQuery = {
                      text: 'INSERT INTO bookings (user_id, trip_id, bus_id, trip_date, seat_number, created_on) VALUES ($1, $2, $3, $4, $5, $6) returning *',
                      values: [
                        decodedUser.id,
                        booking.trip_id,
                        data.rows[0].bus_id,
                        data.rows[0].trip_date,
                        seatNumber,
                        booking.created_on
                      ]
                    };
                    pool.query(bookingQuery, (bookingError, bookingData) => {
                      return res.status(201).json({
                        status: 'success',
                        data: {
                          id: bookingData.rows[0].id,
                          user_id: bookingData.rows[0].user_id,
                          trip_id: bookingData.rows[0].trip_id,
                          bus_id: bookingData.rows[0].bus_id,
                          trip_date: bookingData.rows[0].trip_date,
                          seat_number: bookingData.rows[0].seat_number,
                          first_name: userData.rows[0].first_name,
                          last_name: userData.rows[0].last_name,
                          email: userData.rows[0].email
                        }
                      });
                    });
                  });
                } else {
                  res.status(400).json({
                    status: 'error',
                    error: 'Sorry Bus is Full - Bus Capacity cannot be Exceeded'
                  })
                }
              })
            })
          });
        }
      })
    } else {
      return res.status(400).json({
        status: 'error',
        error: 'Create Booking Failed!'
      })
    }
  }

  static getBooking(req, res) {
    const decodedUser = req.user;
    switch (decodedUser.isAdmin) {
      case true:
        const adminQuery = 'SELECT * from bookings';

        pool.query(adminQuery, (error, data) => {
          return res.status(200).json({
            status: 'success',
            data: [data.rows]
          });
        });
        break;
      case false:
        const nonAdminQuery = {
          text: 'SELECT * FROM bookings WHERE user_id = $1',
          values: [decodedUser.id]
        };

        pool.query(nonAdminQuery, (error, data) => {
          return res.status(200).json({
            status: 'success',
            data: [data.rows]
          });
        });
        break;
      default:
        return res.status(200).json({
          status: 'error',
          error: 'Not Allowed'
        });
    }
  }

  static deleteBooking(req, res) {
    const decodedUser = req.user;

    if (decodedUser) {
      if (Number.isNaN(req.params.bookingId)) {
        return res.status(400).json({
          status: 'error',
          error: 'Invalid Booking ID'
        });
      }

      // Check if booking has already been deleted
      const checkBooking = {
        text: "SELECT id FROM bookings WHERE id = $1",
        values: [req.params.bookingId]
      };

      pool.query(checkBooking, (error, data) => {
        if (data.rowCount === 0) {
          return res.status(409).json({
            status: 'error',
            error: 'Booking has already been deleted'
          })
        }

        const deleteQuery = {
          text: 'DELETE FROM bookings WHERE id = $1',
          values: [req.params.bookingId]
        };

        pool.query(deleteQuery, (err, data) => {
          if (data.rows.length === 0) {
            return res.status(200).json({
              status: 'success',
              data: {
                message: 'Booking deleted successfully'
              }
            });
          }
        });
      })
    }

  }

  static changeSeatNumber(req, res) {
    const decodedUser = req.user;
    const {
      seat_number
    } = req.body;

    if (decodedUser) {
      if (Number.isNaN(req.params.bookingId)) {
        return res.status(400).json({
          status: 'error',
          error: 'Invalid Booking ID'
        });
      }

      const changeSeatQuery = {
        text: 'SELECT * FROM bookings WHERE id = $1',
        values: [req.params.bookingId]
      };

      pool.query(changeSeatQuery, (error, data) => {
        if (data) {
          const checkSeatQuery = {
            text: 'SELECT * FROM bookings WHERE trip_id = $1',
            values: [data.rows[0].trip_id]
          };

          pool.query(checkSeatQuery, (seatError, seatData) => {
            // Check Bus Capacity
            const busCapacity = {
              text: 'SELECT capacity from buses WHERE id = $1',
              values: [seatData.rows[0].bus_id]
            }
            pool.query(busCapacity, (seatCapacityError, seatCapacityData) => {
              if (seat_number > seatCapacityData.rows[0].capacity) {
                res.status(400).json({
                  status: 'error',
                  error: 'Number exceeds the Bus sitting capacity'
                })
              } else {
                const filteredData = seatData.rows.filter(
                  seatNumber => seatNumber.seat_number === seat_number
                );

                if (filteredData.length > 0) {
                  return res.status(409).json({
                    status: 'error',
                    error: 'Seat Number has been taken'
                  });
                }

                const changeSeatNumberQuery = {
                  text: `UPDATE bookings SET seat_number = ${seat_number} WHERE id = $1`,
                  values: [req.params.bookingId]
                };

                pool.query(changeSeatNumberQuery, (newError, newData) => {
                  if (newData) {
                    return res.status(200).json({
                      status: 'success',
                      data: {
                        message: 'Seat Number changed successfully'
                      }
                    });
                  }
                });
              }
            })
          });
        }
      });
    }
  }
}

export default bookingController;