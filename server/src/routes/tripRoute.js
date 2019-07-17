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

tripRoute.get('/api/v1/trips', auth.verifyToken, tripController.getTrips);

tripRoute.patch(
  '/api/v1/trips/:tripId',
  auth.verifyToken,
  tripController.patchTrip
);

tripRoute.get(
  '/api/v1/trips/tripdest/',
  auth.verifyToken,
  tripController.destTrip
);

export default tripRoute;
