import users from '../database/users';

class userValidator {
  static signupValidator(req, res, next) {
    let { email, firstname, lastname, password } = req.body;

    // Email Validation
    if (email === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Email field is required'
      });
    }
    if (email === '') {
      return res.status(400).send({
        status: 'error',
        error: 'Email cannot be empty.'
      });
    }
    if (email.includes(' ')) {
      return res.status(400).send({
        status: 'error',
        error: 'Email cannot include space.'
      });
    }
    const foundEmail = users.find(user => user.email === email);
    if (foundEmail) {
      return res.status(409).send({
        status: 'error',
        error: 'Email already exists!'
      });
    }

    const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!emailCheck.test(email)) {
      return res.status(400).send({
        status: 'error',
        error: 'Email format is invalid'
      });
    }
    email = email.toLowerCase().trim();
    if (email.length < 5 || email.length > 30) {
      return res.status(400).send({
        status: 'error',
        error: 'Email should be 5 to 30 characters long'
      });
    }

    // First name validation
    if (firstname === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Firstname field is required'
      });
    }
    if (firstname === '') {
      return res.status(400).send({
        status: 'error',
        error: 'Firstname field cannot be empty'
      });
    }
    if (typeof firstname !== 'string') {
      return res.status(400).send({
        status: 'error',
        error: 'Firstname must be an alphabet'
      });
    }
    const validFirstNameCharacters = /^[a-zA-Z]+$/;
    if (!validFirstNameCharacters.test(firstname)) {
      return res.status(400).send({
        status: 'error',
        error: 'Firstname accepts only alphabets'
      });
    }

    // Last name validation
    if (lastname === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Lastname field is required'
      });
    }
    if (lastname === '') {
      return res.status(400).send({
        status: 'error',
        error: 'Lastname field cannot be empty'
      });
    }
    if (typeof lastname !== 'string') {
      return res.status(400).send({
        status: 'error',
        error: 'Lastname must be a string'
      });
    }
    const validLastNameCharacters = /^[a-zA-Z]+$/;
    if (!validLastNameCharacters.test(lastname)) {
      return res.status(400).send({
        status: 'error',
        error: 'Lastname accepts only alphabets'
      });
    }

    // Password Validation
    if (password === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Password field is required'
      });
    }
    if (password === '') {
      return res.status(400).send({
        status: 'error',
        error: 'Password field cannot be empty'
      });
    }
    if (password === ' ') {
      return res.status(400).send({
        status: 'error',
        error: 'Password cannot be a space'
      });
    }
    password = password.trim();
    if (password.length < 8 || password.length > 30) {
      return res.status(400).send({
        status: 'error',
        error: 'Password should be 8 to 30 characters long'
      });
    }
    next();
  }

  static loginValidator(req, res, next) {
    // eslint-disable-next-line prefer-const
    let { email, password } = req.body;

    if (email === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Email field cannot be empty'
      });
    }
    if (email === '') {
      return res.status(400).send({
        status: 'error',
        error: 'Email field cannot be empty.'
      });
    }
    if (typeof email !== 'string') {
      return res.status(400).send({
        status: 'error',
        error: 'Email should be a string'
      });
    }
    if (email.includes(' ')) {
      return res.status(400).send({
        status: 'error',
        error: 'Email cannot include space.'
      });
    }

    const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!emailCheck.test(email)) {
      return res.status(400).send({
        status: 'error',
        error: 'Email format is invalid'
      });
    }

    // Password Validation
    if (password === undefined) {
      return res.status(400).send({
        status: 'error',
        error: 'Password field cannot be empty'
      });
    }
    if (password === '') {
      return res.status(400).send({
        status: 'error',
        error: 'Password field cannot be empty'
      });
    }
    if (password === ' ') {
      return res.status(400).send({
        status: 'error',
        error: 'Password cannot be a space'
      });
    }
    password = password.trim();
    if (password.length < 8 || password.length > 30) {
      return res.status(400).send({
        status: 'error',
        error: 'Password should be 8 to 30 characters long'
      });
    }

    return next();
  }
}

export default userValidator;
