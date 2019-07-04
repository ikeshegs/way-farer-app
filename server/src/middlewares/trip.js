class tripValidator {
  static createTripValidator(req, res, next) {
    const { busId, origin, destination, fare } = req.body;

    if (busId === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Bus ID is required'
      });
    }
    if (busId === '') {
      return res.status(400).send({
        status: 'error',
        error: 'Bus ID field cannot be empty'
      });
    }
    if (typeof busId !== 'number') {
      return res.status(400).send({
        status: 'error',
        error: 'Bus ID must be a Number'
      });
    }
    if (busId === ' ') {
      return res.status(400).send({
        status: 'error',
        error: 'Bus ID cannot be a space'
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
        error: 'Bus Origin is cannot be empty'
      });
    }
    if (typeof origin !== 'string') {
      return res.status(400).send({
        status: 'error',
        error: 'Bus Origin must be in alphabets'
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
        error: 'Bus destination is cannot be empty'
      });
    }
    if (typeof destination !== 'string') {
      return res.status(400).send({
        status: 'error',
        error: 'Bus destination must be in alphabets'
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
    if (fare === '') {
      return res.status(400).send({
        status: 'error',
        error: 'Fare field cannot be empty'
      });
    }
    if (typeof fare !== 'number') {
      return res.status(400).send({
        status: 'error',
        error: 'Fare must be a Number'
      });
    }
    if (fare === ' ') {
      return res.status(400).send({
        status: 'error',
        error: 'Fare cannot be a space'
      });
    }
    next();
  }
}

export default tripValidator;
