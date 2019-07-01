import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createToken = payload =>
  jwt.sign(payload, 'process.env.JWT_KEY', { expiresIn: '1h' });

export default { createToken };
