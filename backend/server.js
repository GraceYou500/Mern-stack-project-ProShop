import path from 'path';
import express from 'express'; // like import in JS, this express is the syntax of Node JS.
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import products from './data/products.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();
connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // can accept json data

app.use('/api/products', productRoutes); // use same as listen
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// new

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  // means when we deploy to the server
  app.use(express.static(path.join(__dirname, '/frontend/build'))); // set the build folder as static folder so that we can access to and load the build-index.html directly

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  ); // if we are in production, we are going to go ahead and get any route that is not our API to point to the index.html
} else {
  app.get('/', (req, res) => {
    res.send('API is running...0000');
    // send to client
  }); // create a route, meaning if we get a GET request to slash, we want to run the function
  // get is a listener=> listen the request to the url
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
); // listen on a port 5000
