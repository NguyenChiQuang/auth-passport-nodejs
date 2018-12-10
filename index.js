const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// get all api route
const api = require('./src/routes/index');
const config = require('./config');

// Set up the express app
const app = express();

//connect db cloud.mongodb.com
mongoose.connect(
  `mongodb+srv://admin:${config.MONGODB_ATLAS_PW}@cluster0-ao8mc.mongodb.net/test?retryWrites=true`,
  {
    useNewUrlParser: true,
  }
);

// Log requests to the console.
app.use(logger('dev'));

//setup bodyParser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;