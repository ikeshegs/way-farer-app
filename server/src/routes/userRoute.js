import express from 'express';
import userValidator from '../middlewares/user';
import userController from '../controllers/userController';
import auth from '../helpers/auth';

// Set Router
const userRoute = express.Router();

userRoute.post(
  '/api/v1/auth/signup',
  userValidator.signupValidator,
  userController.createUser
);

userRoute.post(
  '/api/v1/auth/signin',
  userValidator.loginValidator,
  userController.userSignin
);

userRoute.get('/api/v1/users', auth.verifyToken, userController.getUsers);

export default userRoute;