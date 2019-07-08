const usersTable = 'DROP TABLE IF EXISTS users CASCADE; ';
const tripsTable = 'DROP TABLE IF EXISTS trips CASCADE; ';
const busesTable = 'DROP TABLE IF EXISTS buses CASCADE; ';
const bookingsTable = 'DROP TABLE IF EXISTS bookings CASCADE; ';

const dropQuery = `${usersTable}${tripsTable}${busesTable}${bookingsTable}`;

export default dropQuery;
