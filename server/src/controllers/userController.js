import bcrypt from 'bcrypt';
import uuid from 'uuid/v4';
import auth from '../helpers/auth';
import pool from '../database/usersDB';

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
      user_id: uuid(),
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      email: req.body.email,
      password: hash,
      is_admin: false
    };

    // Create account if no errors
    const query = {
      text:
        'INSERT INTO users (user_id, first_name, last_name, email, password, is_admin) VALUES ($1, $2, $3, $4, $5, $6) returning *',
      values: [
        user.user_id,
        user.first_name,
        user.last_name,
        user.email,
        user.password,
        user.is_admin
      ]
    };

    const token = auth.createToken(user);

    pool.query(query, (error, data) => {
      if (error.routine === '_bt_check_unique') {
        res.status(409).send({
          status: 'error',
          error: 'Email already exist'
        });
      }

      if (data) {
        return res.status(201).send({
          status: 'success',
          data: {
            user_id: data.rows[0].user_id,
            is_admin: data.rows[0].is_admin,
            token
          }
        });
      }
    });
  }

  static userSignup(req, res) {
    const { email, password } = req.body;

    const query = {
      text:
        'SELECT user_id, first_name, last_name, email, password, is_admin FROM users WHERE email = $1',
      values: [email]
    };

    pool.query(query, (error, data) => {
      if (data.rows.length === 0) {
        return res.status(400).send({
          status: 'error',
          error: 'No user in the database'
        });
      }

      if (data) {
        const comparePassword = bcrypt.compareSync(
          password,
          data.rows[0].password
        );

        if (comparePassword) {
          const token = auth.createToken(data.rows[0]);
          return res.status(200).send({
            status: 'success',
            data: {
              user_id: data.rows[0].user_id,
              is_admin: data.rows[0].is_admin,
              token
            }
          });
        }
        return res.status(400).json({
          status: 'error',
          error: 'Invalid Credentials'
        });
      }
    });
  }

  static getUsers(req, res) {
    const decodedUser = req.user;

    if (decodedUser.is_admin === true) {
      const filterUser = users.filter(user => user);
      return res.status(200).send({
        status: 'success',
        data: filterUser
      });
    }
    return res.status(401).send({
      status: 'error',
      error: 'Unauthorized'
    });
  }
}

export default userController;
