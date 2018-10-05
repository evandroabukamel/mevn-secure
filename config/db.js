const mongoose = require("mongoose");

const dbConfig = require('./dbconfig')
const mongoUri = `mongodb+srv://${dbConfig.dbUser}:${dbConfig.dbPass}@${dbConfig.dbUrl}/${dbConfig.dbName}?retryWrites=true`;

const options = {
  ssl: true,
  authSource: 'admin',
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
  retryWrites: true
};

mongoose.connect(mongoUri, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

// require any models
require('../models/Book')