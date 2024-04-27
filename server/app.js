var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const app = express();
var cors = require('cors');
app.use(cors());
require('dotenv').config();
require('./models/db');

var apiRouter = require('./routes/apiRouter');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
console.log('app-env ==============> ', app.get('env'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 3600 * 24 * 1000 },
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/session',
    secret: process.env.SESSION_SECRET,
    touchAfter: 24 * 60 * 60
  })
}));


const parentDirectory = path.resolve(__dirname, '..');
const staticMiddleware = express.static(path.join(parentDirectory, '/build'));
app.use('/', staticMiddleware);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;