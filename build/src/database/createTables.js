"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBookings = exports.createTrips = exports.createBuses = exports.createUsers = void 0;
var createUsers = "\nCREATE TABLE IF NOT EXISTS users (\n    id SERIAL PRIMARY KEY,\n    first_name VARCHAR (40) NOT NULL,\n    last_name VARCHAR (40) NOT NULL,\n    email VARCHAR (40) NOT NULL UNIQUE,\n    password VARCHAR (255) NOT NULL,\n    is_admin BOOLEAN NOT NULL\n)";
exports.createUsers = createUsers;
var createBuses = "\nCREATE TABLE IF NOT EXISTS buses (\n    id SERIAL PRIMARY KEY,\n    number_plate VARCHAR (20) NOT NULL,\n    manufacturer VARCHAR (30) NOT NULL,\n    model VARCHAR (30) NOT NULL,\n    year INTEGER NOT NULL,\n    capacity INTEGER NOT NULL\n)";
exports.createBuses = createBuses;
var createTrips = "\nCREATE TABLE IF NOT EXISTS trips (\n    id SERIAL PRIMARY KEY,\n    bus_id SERIAL REFERENCES buses(id) NOT NULL,\n    origin VARCHAR (30) NOT NULL,\n    destination VARCHAR (30) NOT NULL,\n    trip_date DATE NOT NULL,\n    fare NUMERIC NOT NULL,\n    status VARCHAR (10) DEFAULT 'active'\n)";
exports.createTrips = createTrips;
var createBookings = "\nCREATE TABLE IF NOT EXISTS bookings (\n    id SERIAL,\n    user_id SERIAL REFERENCES users(id),\n    trip_id SERIAL REFERENCES trips(id),\n    bus_id SERIAL NOT NULL,\n    trip_date DATE NOT NULL,\n    seat_number INTEGER,\n    first_name VARCHAR (30) NOT NULL,\n    last_name VARCHAR (30) NOT NULL,\n    email VARCHAR (30) NOT NULL,\n    created_on DATE NOT NULL\n)";
exports.createBookings = createBookings;