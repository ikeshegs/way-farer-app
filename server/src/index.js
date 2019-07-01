import express from 'express';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRoute);

app.get('/', (req, res) => {
  return res
    .status(200)
    .send('Welcome to WayFarer app. A public bus transport booking app.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('App is running on port', PORT);

export default app;
