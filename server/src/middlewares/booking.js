/* eslint-disable camelcase */
class bookingValidator {
  static createBookingValidator(req, res, next) {
    const { trip_id, seat_number } = req.body;

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
