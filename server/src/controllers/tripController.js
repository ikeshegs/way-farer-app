// import auth from '../helpers/auth';
import trips from '../database/trips';

class tripController {
  static async createTrip(req, res) {
    const { busId, origin, destination, fare } = req.body;

    const createdOn = new Date();
    const decodedUser = req.user;

    if (decodedUser.is_admin === true) {
      try {
        const trip = {
          tripId: trips.length + 1,
          busId,
          origin,
          destination,
          tripDate: createdOn,
          fare
        };

        trips.push(trip);
        return res.status(201).send({
          status: 'success',
          data: {
            trip_id: trip.tripId,
            bus_id: trip.busId,
            origin: trip.origin,
            destination: trip.destination,
            trip_date: trip.tripDate,
            fare: trip.fare
          }
        });
      } catch {
        return res.status(401).send({
          status: 'error',
          error: 'Unauthorized'
        });
      }
    }
    return res.status(403).send({
      status: 'error',
      error: 'Forbidden'
    });
  }

  static async getTrips(req, res) {
    const decodedUser = req.user;

    try {
      if (decodedUser) {
        const filterTrips = trips.filter(trip => trip);
        return res.status(200).send({
          status: 'success',
          data: filterTrips
        });
      }
    } catch {
      return res.status(401).send({
        status: 'error',
        error: 'Unauthorized'
      });
    }
  }
}

export default tripController;
