const createUsers = `
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY NOT NULL,
    first_name VARCHAR (40) NOT NULL,
    last_name VARCHAR (40) NOT NULL,
    email VARCHAR (40) NOT NULL UNIQUE,
    password VARCHAR (255) CHECK (password >= 8 && password <= 30),
    is_admin BOOLEAN DEFAULT false
)`;

const createBuses = `
CREATE TABLE IF NOT EXISTS buses (
    bus_id UUID PRIMARY KEY NOT NULL,
    number_plate VARCHAR (20) NOT NULL,
    manufacturer VARCHAR (30) NOT NULL,
    model VARCHAR (30) NOT NULL,
    year INTEGER NOT NULL CHECK (year > 3 && year < 5),
    capacity INTEGER NOT NULL
)`;

const createTrips = `
CREATE TABLE IF NOT EXISTS trips (
    trip_id UUID PRIMARY KEY NOT NULL,
    bus_id UUID REFERENCES buses(bus_id) NOT NULL,
    origin VARCHAR (30) NOT NULL,
    destination VARCHAR (30) NOT NULL,
    trip_date VARCHAR (20) NOT NULL,
    fare NUMERIC NOT NULL,
    status VARCHAR (10) DEFAULT 'active'
)`;

const createBookings = `
CREATE TABLE IF NOT EXISTS bookings (
    booking_id UUID NOT NULL,
    user_id UUID REFERENCES users(user_id),
    trip_id UUID REFERENCES trips(trip_id),
    bus_id UUID REFERENCES trips(bus_id),
    trip_date VARCHAR REFERENCES trips(trip_date),
    seat_number INTEGER NOT NULL,
    first_name VARCHAR (40) REFERENCES users(first_name),
    last_name VARCHAR (40) REFERENCES users(last_name),
    email VARCHAR (40) REFERENCES users(email),
    CONSTRAINT new_booking_id PRIMARY KEY(trip_id, user_id)
)`;

const createdQuery = `${createUsers}${createBuses}${createTrips}${createBookings}`;
export default createdQuery;
