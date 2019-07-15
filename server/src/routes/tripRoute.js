import express from 'express';
import auth from '../helpers/auth';
import tripController from '../controllers/tripController';
import tripValidator from '../middlewares/trip';

const tripRoute = express.Router();

tripRoute.post(
  '/trips',
  auth.verifyToken,
  tripValidator.createTripValidator,
  tripController.createTrip
);

tripRoute.get('/trips', auth.verifyToken, tripController.getTrips);

tripRoute.patch('/trips/:tripId', auth.verifyToken, tripController.patchTrip);

export default tripRoute;
