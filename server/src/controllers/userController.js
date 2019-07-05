import bcrypt from 'bcrypt';
import auth from '../helpers/auth';
import users from '../database/users';

const salt = bcrypt.genSaltSync(10);

class userController {
  static createUser(req, res) {
    const hash = bcrypt.hashSync(req.body.password, salt, (err, result) => {
      if (err) {
        return err;
      }
      return result;
    });

    const user = {
      id: users.length + 1,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      email: req.body.email,
      password: hash,
      is_admin: false
    };

    // Create account if no errors
    users.push(user);
    const token = auth.createToken(user);
    return res.status(201).json({
      status: 'success',
      data: {
        user_id: user.id,
        is_admin: user.is_admin,
        token
      }
    });
  }

  static userSignup(req, res) {
    const { email, password } = req.body;

    const foundUser = users.find(user => user.email === email);

    if (!foundUser) {
      return res.status(400).send({
        status: 'error',
        error: 'No user in the database'
      });
    }

    const comparePassword = bcrypt.compareSync(password, foundUser.password);

    if (comparePassword) {
      const token = auth.createToken(foundUser);
      return res.status(200).json({
        status: 'success',
        data: {
          user_id: foundUser.id,
          is_admin: foundUser.is_admin,
          token
        }
      });
    }
    return res.status(400).json({
      status: 'error',
      error: 'Authentication Failed'
    });
  }

  static getUsers(req, res) {
    const filterUser = users.filter(user => user);
    return res.status(200).send({
      status: 'success',
      data: filterUser
    });
  }
}

export default userController;
