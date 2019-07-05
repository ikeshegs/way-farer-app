import express from 'express';
import 'regenerator-runtime/runtime';
import 'core-js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import tripRoute from './routes/tripRoute';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRoute);
app.use(tripRoute);

app.get('/', (req, res) => {
  return res.send({
    status: 200,
    message: 'Welcome to WayFarer app. A public bus transport booking app.'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('App is running on port', PORT);

export default app;
