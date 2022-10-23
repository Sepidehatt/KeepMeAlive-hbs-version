require('dotenv').config()

const Project = require('../models/Project.model');
const Counter = require('../models/CronCounter.model');
const axios = require('axios');

const mongoose = require("mongoose");
const MONGO_URI = require("../utils/consts");

const CounterId = '63548b2012676ac2c93513c9'

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    return Project.find()
  })
  .then(projects => {
    projects.forEach(project => {
      axios.get(project.endPointsLink)
        .then(() => console.log('running axios'))
        .catch(err => console.log('something wrong on the cron job', err))
    })
    return Counter.findByIdAndUpdate(CounterId, { $inc: { count:1 } }, { new: true })
  })
  .then(() => {
    return mongoose.connection.close()
  })
  .then(() => console.log('DB disconnected'))
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });