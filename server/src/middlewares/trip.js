/* eslint-disable camelcase */
class tripValidator {
  static createTripValidator(req, res, next) {
    const { bus_id, origin, destination, trip_date, fare } = req.body;

    if (bus_id === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Bus ID is required'
      });
    }
    if (bus_id === '') {
      return res.status(400).send({
        status: 'error',
        error: 'Bus ID cannot be empty'
      });
    }
    if (typeof bus_id !== 'number') {
      return res.status(400).send({
        status: 'error',
        error: 'Bus ID must be a Number'
      });
    }

    if (origin === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Bus Origin is required'
      });
    }
    if (origin === '') {
      return res.status(400).send({
        status: 'error',
        error: 'Bus Origin cannot be empty'
      });
    }
    if (origin === ' ') {
      return res.status(400).send({
        status: 'error',
        error: 'Bus Origin cannot be a space'
      });
    }

    if (destination === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Bus destination is required'
      });
    }
    if (destination === '') {
      return res.status(400).send({
        status: 'error',
        error: 'Bus destination cannot be empty'
      });
    }
    if (destination === ' ') {
      return res.status(400).send({
        status: 'error',
        error: 'Bus destination cannot be a space'
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

    if (fare === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Fare is required'
      });
    }
    if (typeof fare !== 'number') {
      return res.status(400).send({
        status: 'error',
        error: 'Fare must be a Number'
      });
    }
    next();
  }
}

export default tripValidator;
