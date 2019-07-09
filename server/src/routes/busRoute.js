import express from 'express';
import auth from '../helpers/auth';
import busController from '../controllers/busController';
import busValidator from '../middlewares/bus';

const busRoute = express.Router();

busRoute.post(
  '/api/v1/bus',
  auth.verifyToken,
  busValidator.createBusValidator,
  busController.createBus
);

busRoute.get('/api/v1/bus', auth.verifyToken, busController.getBuses);

export default busRoute;
