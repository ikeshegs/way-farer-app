import express from 'express';
import auth from '../helpers/auth';
import tripController from '../controllers/tripController';
import tripValidator from '../middlewares/trip';

const tripRoute = express.Router();

tripRoute.post(
  '/api/v1/trips',
  auth.verifyToken,
  tripValidator.createTripValidator,
  tripController.createTrip
);

tripRoute.get('/api/v1/trips', auth.verifyToken, tripController.getTrips);

export default tripRoute;
