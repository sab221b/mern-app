const mongoose = require("mongoose");
require('dotenv').config();

mongoose
  .connect(`mongodb://localhost:27017/${process.env.APP_NAME}`)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log('Error in DB connection: ' + err));

require('./user');
require('./profile');
require('./feature');
require('./role');
require('./agentType');
require('./transaction');
