/* eslint-disable camelcase */
class bookingValidator {
  static createBookingValidator(req, res, next) {
    const { trip_id, bus_id, trip_date, seat_number } = req.body;

    if (typeof trip_id === 'undefined') {
      return res.status(400).send({
        status: 'error',
        error: 'Trip ID field is required'
      });
    }
    if (trip_id === '') {
      return res.status(400).send({
        status: 'error',
        error: 'Trip ID field cannot be empty'
      });
    }
    if (typeof trip_id !== 'number') {
      return res.status(400).send({
        status: 'error',
        error: 'Trip ID must be a number.'
      });
    }

    // BUS ID CHECK
    if (typeof bus_id === 'undefined') {
      return res.status(400).send({
        status: 'error',
        error: 'Bus ID field is required'
      });
    }
    if (bus_id === '') {
      return res.status(400).send({
        status: 'error',
        error: 'Bus ID field cannot be empty'
      });
    }
    if (typeof bus_id !== 'number') {
      return res.status(400).send({
        status: 'error',
        error: 'Bus ID must be a number.'
      });
    }

    // TRIP DATE CHECK
    if (typeof trip_date !== 'string') {
      return res.status(400).send({
        status: 'error',
        error: 'Trip Date must be a number.'
      });
    }
    if (typeof trip_date === 'undefined') {
      return res.status(400).send({
        status: 'error',
        error: 'Trip Date field is required.'
      });
    }

    // SEAT NUMBER CHECK
    if (typeof seat_number !== 'number') {
      return res.status(400).send({
        status: 'error',
        error: 'Seat Number must be a Number.'
      });
    }
    if (seat_number === ' ') {
      return res.status(400).send({
        status: 'error',
        error: 'Seat Number field cannot be a space'
      });
    }
    return next();
  }
}

export default bookingValidator;
