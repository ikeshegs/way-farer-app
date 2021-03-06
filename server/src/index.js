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
import bookRoute from './routes/bookRoute';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(swaggerRoute);
app.use(userRoute);
app.use(tripRoute);
app.use(busRoute);
app.use(bookRoute);

app.get('/', (req, res) => {
  return res.send({
    status: 200,
    message: {
      'Message': 'These are the accessible APIs',
      '1': 'GET: https://my-way-farer-app.herokuapp.com/api/v1/bus',
      '2': 'GET: https://my-way-farer-app.herokuapp.com/api/v1/users',
      '3': 'GET: https://my-way-farer-app.herokuapp.com/api/v1/trips'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('App is running on port', PORT);

export default app;