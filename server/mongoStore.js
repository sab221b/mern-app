const MongoStore = require("connect-mongo");
require('dotenv').config();

const mongoStore = MongoStore.create({
  mongoUrl: `${process.env.MONGO_URL}/session`,
  secret: process.env.SESSION_SECRET,
  ttl: 24 * 60 * 60, // expires after 1 day
});

module.exports = { mongoStore };
