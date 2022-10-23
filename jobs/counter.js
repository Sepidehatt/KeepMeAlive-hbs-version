require('dotenv').config()
const mongoose = require("mongoose");
const Counter = require('../models/CronCounter.model');
const MONGO_URI = require("../utils/consts");



mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    return Counter.create({count: 0})
  })
  .then(counter => {
    console.log(counter)
    return mongoose.connection.close()
  })
  .then(() => console.log('DB disconnected'))
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });