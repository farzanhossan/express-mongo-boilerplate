import mongoose from 'mongoose';
import config from '../config/config';

const dbUrl = config.database.uri;

if (!dbUrl) {
  console.log('Mongo url is not set in env file or config.js', dbUrl);
  new Error('Mongo url is not set in env file or config.js');
}

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log(`Filled to connect database. ${error}`);
  });

module.exports = mongoose;
