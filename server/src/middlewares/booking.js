/* eslint-disable camelcase */
class bookingValidator {
  static createBookingValidator(req, res, next) {
    const { trip_id } = req.body;

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

    return next();
  }
}

export default bookingValidator;
