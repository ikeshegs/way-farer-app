import express from 'express';
import 'regenerator-runtime/runtime';
import 'core-js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

// Routes
import swaggerRoute from './routes/swaggerRoute';
import userRoute from './routes/userRoute';
import tripRoute from './routes/tripRoute';
import busRoute from './routes/busRoute';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(swaggerRoute);
app.use(userRoute);
app.use(tripRoute);
app.use(busRoute);

app.get('/', (req, res) => {
  return res
    .status(200)
    .send('Welcome to WayFarer App. A public bus transport booking app. 😀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('App is running on port', PORT);

export default app;
