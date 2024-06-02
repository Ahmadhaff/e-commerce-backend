import mongoose from 'mongoose';
import Logger from '../core/Logger';
import { db } from '../config';

// Build the connection string
const dbURI = `mongodb+srv://amelbenyaakoub:Osz9mXfrKGF82OmP@cluster1.k4m1jub.mongodb.net/DB`;
Logger.debug(dbURI);

// Create the database connection
mongoose
  .connect(dbURI)
  .then(() => {
    Logger.info('Mongoose connection done');
  })
  .catch((e) => {
    Logger.info('Mongoose connection error');
    Logger.error(e);
  });

// When successfully connected
mongoose.connection.on('connected', () => {
  Logger.info('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  Logger.error('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  Logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close();
  Logger.info('Mongoose default connection disconnected through app termination');
  process.exit(0);
});
