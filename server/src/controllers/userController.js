import bcrypt from 'bcrypt';
import auth from '../helpers/auth';
import pool from '../database/db';

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
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hash,
      is_admin: req.body.is_admin || false
    };

    // Create account if no errors
    const userQuery = {
      text: 'INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES ($1, $2, $3, $4, $5) returning *',
      values: [
        user.first_name,
        user.last_name,
        user.email,
        user.password,
        user.is_admin
      ]
    };

    pool.query(userQuery, (error, data) => {
      // Create user Signup Token
      const token = auth.createToken(data.rows[0]);

      if (data) {
        return res.status(201).json({
          status: 'success',
          data: {
            user_id: data.rows[0].id,
            is_admin: data.rows[0].is_admin,
            token
          }
        });
      }

      if (error.routine === '_bt_check_unique') {
        res.status(409).json({
          status: 'error',
          error: 'Email already exist'
        });
      }
    });
  }

  static userSignin(req, res) {
    const {
      email,
      password
    } = req.body;

    const query = {
      text: 'SELECT id, first_name, last_name, email, password, is_admin FROM users WHERE email = $1',
      values: [email]
    };

    pool.query(query, (error, data) => {
      if (data.rows.length === 0) {
        return res.status(404).json({
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
          return res.status(200).json({
            status: 'success',
            data: {
              user_id: data.rows[0].id,
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

  // static getUsers(req, res) {
  //   const decodedUser = req.user;

  //   if (decodedUser.isAdmin === true) {
  //     const query = 'SELECT * FROM users';

  //     pool.query(query, (error, data) => {
  //       if (data.rows.length !== 0) {
  //         return res.status(200).json({
  //           status: 'success',
  //           data: data.rows
  //         });
  //       }
  //     });
  //   }
  // }
  static getUsers(req, res) {
    // const decodedUser = req.user;
      const query = 'SELECT * FROM users';
      pool.query(query, (error, data) => {
        if (data.rows.length !== 0) {
          return res.status(200).json({
            status: 'success',
            data: data.rows
          });
        }
      });
  }
}

export default userController;