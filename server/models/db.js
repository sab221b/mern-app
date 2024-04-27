const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/pro2Z")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log('Error in DB connection: ' + err));

require('./user');
require('./profile');