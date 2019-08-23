export const createUsers = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR (40) NOT NULL,
    last_name VARCHAR (40) NOT NULL,
    email VARCHAR (40) NOT NULL UNIQUE,
    password VARCHAR (255) NOT NULL,
    is_admin BOOLEAN NOT NULL
)`;

export const createBuses = `
CREATE TABLE IF NOT EXISTS buses (
    id SERIAL PRIMARY KEY,
    number_plate VARCHAR (20) NOT NULL,
    manufacturer VARCHAR (30) NOT NULL,
    model VARCHAR (30) NOT NULL,
    year INTEGER NOT NULL,
    capacity INTEGER NOT NULL
)`;

export const createTrips = `
CREATE TABLE IF NOT EXISTS trips (
    id SERIAL PRIMARY KEY,
    bus_id SERIAL REFERENCES buses(id) NOT NULL,
    origin VARCHAR (30) NOT NULL,
    destination VARCHAR (30) NOT NULL,
    trip_date DATE NOT NULL,
    fare NUMERIC NOT NULL,
    status VARCHAR (10) DEFAULT 'active'
)`;

export const createBookings = `
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL,
    user_id SERIAL REFERENCES users(id),
    trip_id SERIAL REFERENCES trips(id),
    bus_id SERIAL NOT NULL,
    trip_date DATE NOT NULL,
    seat_number INTEGER,
    created_on DATE NOT NULL
)`;