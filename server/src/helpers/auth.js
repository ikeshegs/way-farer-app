import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
// import JWT_KEY from '../config/jwt_config';

dotenv.config();

const createToken = payload =>
  jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });

// eslint-disable-next-line consistent-return
const verifyToken = (req, res, next) => {
  const header = req.headers.authorization || req.query.token || req.body.token;

  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];
    req.token = token;
    try {
      const result = jwt.verify(token, process.env.JWT_KEY);
      req.user = result;
    } catch (e) {
      return res.status(403).json({
        status: 'error',
        error: 'Forbidden'
      });
    }
    next();
  } else {
    // If header is undefined
    return res.status(401).json({
      status: 'error',
      error: 'Unauthorized'
    });
  }
};

export default { createToken, verifyToken };
