import express from 'express';
import auth from '../helpers/auth';
import bookingValidator from '../middlewares/booking';
import bookingController from '../controllers/bookingController';

// Set Router
const bookRoute = express.Router();

bookRoute.post(
  '/api/v1/bookings',
  auth.verifyToken,
  bookingValidator.createBookingValidator,
  bookingController.createBooking
);

bookRoute.get(
  '/api/v1/bookings',
  auth.verifyToken,
  bookingController.getBooking
);

bookRoute.delete(
  '/api/v1/bookings/:bookingId',
  auth.verifyToken,
  bookingController.deleteBooking
);

bookRoute.put(
  '/api/v1/bookings/:bookingId',
  auth.verifyToken,
  bookingController.changeSeatNumber
);

export default bookRoute;