class tripValidator {
  static createTripValidator(req, res, next) {
    const { busId, origin, destination, fare } = req.body;

    if (busId === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Bus ID is required'
      });
    }
    if (typeof busId !== 'number') {
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
