import express from 'express';
import auth from '../helpers/auth';
import bookingValidator from '../middlewares/booking';
import bookingController from '../controllers/bookingController';

// Set Router
const bookRoute = express.Router();

bookRoute.post(
  '/bookings',
  auth.verifyToken,
  bookingValidator.createBookingValidator,
  bookingController.createBooking
);

bookRoute.get('/bookings', auth.verifyToken, bookingController.getBooking);

bookRoute.delete(
  '/bookings/:bookingId',
  auth.verifyToken,
  bookingController.deleteBooking
);

export default bookRoute;
