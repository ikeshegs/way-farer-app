const usersDestroy = 'DROP TABLE IF EXISTS users CASCADE; ';
const tripsDestroy = 'DROP TABLE IF EXISTS trips CASCADE; ';
const busesDestroy = 'DROP TABLE IF EXISTS buses CASCADE; ';
const bookingsDestroy = 'DROP TABLE IF EXISTS bookings CASCADE; ';

const dropQuery = `${usersDestroy}${tripsDestroy}${busesDestroy}${bookingsDestroy}`;

export default dropQuery;
