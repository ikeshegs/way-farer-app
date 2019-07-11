"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBookings = exports.createTrips = exports.createBuses = exports.createUsers = void 0;
var createUsers = "\nCREATE TABLE IF NOT EXISTS users (\n    user_id SERIAL PRIMARY KEY NOT NULL,\n    first_name VARCHAR (40) NOT NULL,\n    last_name VARCHAR (40) NOT NULL,\n    email VARCHAR (40) NOT NULL UNIQUE,\n    password VARCHAR (255) NOT NULL,\n    is_admin BOOLEAN NOT NULL\n)";
exports.createUsers = createUsers;
var createBuses = "\nCREATE TABLE IF NOT EXISTS buses (\n    bus_id SERIAL PRIMARY KEY NOT NULL,\n    number_plate VARCHAR (20) NOT NULL,\n    manufacturer VARCHAR (30) NOT NULL,\n    model VARCHAR (30) NOT NULL,\n    year INTEGER NOT NULL,\n    capacity INTEGER NOT NULL\n)";
exports.createBuses = createBuses;
var createTrips = "\nCREATE TABLE IF NOT EXISTS trips (\n    trip_id SERIAL PRIMARY KEY NOT NULL,\n    bus_id SERIAL REFERENCES buses(bus_id) NOT NULL,\n    origin VARCHAR (30) NOT NULL,\n    destination VARCHAR (30) NOT NULL,\n    trip_date DATE NOT NULL,\n    fare NUMERIC NOT NULL,\n    status VARCHAR (10) DEFAULT 'active'\n)";
exports.createTrips = createTrips;
var createBookings = "\nCREATE TABLE IF NOT EXISTS bookings (\n    booking_id SERIAL NOT NULL,\n    user_id SERIAL REFERENCES users(user_id),\n    trip_id SERIAL REFERENCES trips(trip_id),\n    created_on DATE NOT NULL,\n    seat_number INT,\n    CONSTRAINT new_booking_id PRIMARY KEY(trip_id, user_id)\n)";
exports.createBookings = createBookings;