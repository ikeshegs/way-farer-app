import express from 'express';
import userValidator from '../middlewares/user';
import userController from '../controllers/userController';

// Set Router
const userRoute = express.Router();

userRoute.post(
  '/api/v1/auth/signup',
  userValidator.signupValidator,
  userController.createUser
);

userRoute.get('/api/v1/getusers', userController.getUsers);

export default userRoute;
