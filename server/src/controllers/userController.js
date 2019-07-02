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
      password: hash
    };

    // Create account if no errors
    users.push(user);
    const token = auth.createToken(user);
    return res.status(201).json({
      status: 201,
      message: 'Success: User created successfully',
      token
    });
  }

  static getUsers(req, res) {
    const filterUser = users.filter(user => user);

    return res.status(200).send({
      status: 200,
      data: [filterUser]
    });
  }
}

export default userController;
