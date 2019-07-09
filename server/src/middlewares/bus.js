class busValidator {
  static createBusValidator(req, res, next) {
    const { numberPlate, manufacturer, model, year, capacity } = req.body;

    // Email Validation
    if (numberPlate === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Number Plate field is required'
      });
    }
    if (numberPlate === '') {
      return res.status(400).send({
        status: 'error',
        error: 'Number Plate cannot be empty.'
      });
    }
    //   email = email.toLowerCase().trim();
    //   if (email.length < 5 || email.length > 30) {
    //     return res.status(400).send({
    //       status: 'error',
    //       error: 'Email should be 5 to 30 characters long'
    //     });
    //   }

    if (manufacturer === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Manufacturer field is required'
      });
    }
    if (manufacturer === '') {
      return res.status(400).send({
        status: 'error',
        error: 'Manufacturer field cannot be empty'
      });
    }
    if (typeof manufacturer !== 'string') {
      return res.status(400).send({
        status: 'error',
        error: 'Manufacturer must be an alphabet'
      });
    }
    /* const validManufacturersCharacters = /^[a-zA-Z]+$/;
    if (!validManufacturersCharacters.test(manufacturer)) {
      return res.status(400).send({
        status: 'error',
        error: 'Manufacturer accepts only alphabets'
      });
    } */

    if (model === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Model field is required'
      });
    }
    if (model === '') {
      return res.status(400).send({
        status: 'error',
        error: 'model field cannot be empty'
      });
    }
    const validModelCharacters = /^[a-zA-Z0-9]+$/;
    if (!validModelCharacters.test(model)) {
      return res.status(400).send({
        status: 'error',
        error: 'Model accepts only Alphanumeric Characters'
      });
    }

    if (year === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Year field is required'
      });
    }
    if (year === '') {
      return res.status(400).send({
        status: 'error',
        error: 'Year field cannot be empty'
      });
    }
    if (year === ' ') {
      return res.status(400).send({
        status: 'error',
        error: 'Year cannot be a space'
      });
    }
    const validYearCharacters = /^[0-9]+$/;
    if (!validYearCharacters.test(year)) {
      return res.status(400).send({
        status: 'error',
        error: 'Year accepts only Alphanumeric Characters'
      });
    }
    // year = year.trim();
    if (year.length > 3 && year.length < 5) {
      return res.status(400).send({
        status: 'error',
        error: 'Year should be 4 characters long'
      });
    }

    if (capacity === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Capacity field is required'
      });
    }
    if (capacity === '') {
      return res.status(400).send({
        status: 'error',
        error: 'Capacity field cannot be empty'
      });
    }
    if (capacity === ' ') {
      return res.status(400).send({
        status: 'error',
        error: 'Capacity cannot be a space'
      });
    }
    // year = year.trim();
    if (typeof capacity !== 'number') {
      return res.status(400).send({
        status: 'error',
        error: 'Year must ba a number'
      });
    }
    next();
  }
}

export default busValidator;
