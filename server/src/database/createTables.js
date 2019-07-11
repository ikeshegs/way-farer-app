export const createUsers = `
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR (40) NOT NULL,
    last_name VARCHAR (40) NOT NULL,
    email VARCHAR (40) NOT NULL UNIQUE,
    password VARCHAR (255) NOT NULL,
    is_admin BOOLEAN NOT NULL
)`;

export const createBuses = `
CREATE TABLE IF NOT EXISTS buses (
    bus_id SERIAL PRIMARY KEY NOT NULL,
    number_plate VARCHAR (20) NOT NULL,
    manufacturer VARCHAR (30) NOT NULL,
    model VARCHAR (30) NOT NULL,
    year INTEGER NOT NULL,
    capacity INTEGER NOT NULL
)`;

export const createTrips = `
CREATE TABLE IF NOT EXISTS trips (
    trip_id SERIAL PRIMARY KEY NOT NULL,
    bus_id SERIAL REFERENCES buses(bus_id) NOT NULL,
    origin VARCHAR (30) NOT NULL,
    destination VARCHAR (30) NOT NULL,
    trip_date DATE NOT NULL,
    fare NUMERIC NOT NULL,
    status VARCHAR (10) DEFAULT 'active'
)`;

export const createBookings = `
CREATE TABLE IF NOT EXISTS bookings (
    booking_id SERIAL NOT NULL,
    user_id SERIAL REFERENCES users(user_id),
    trip_id SERIAL REFERENCES trips(trip_id),
    created_on DATE NOT NULL,
    seat_number INT,
    CONSTRAINT new_booking_id PRIMARY KEY(trip_id, user_id)
)`;
