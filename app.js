var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require("mongoose")
const passport = require("./oauth/index")

var indexRouter = require('./routes/indexRouter')
var usersRouter = require('./routes/userRouter')
var authRouter = require('./routes/authRouter')
var expRouter = require('./routes/experienceRouter')
require('dotenv').config()

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

mongoose.connect(process.env.DB, { 
  // some options to deal with deprecated warning, you don't have to worry about them.
  useCreateIndex: true, 
  useNewUrlParser: true, 
  useFindAndModify: false, 
  useUnifiedTopology: true 
  })
  .then(()=> {
    console.log("Connected to database")
    console.log("PORT: ", process.env.PORT)
  }
)

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use("/experiences", expRouter)
// app.use(passport.initialize())



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_DEV != "development") {
      res.status(err.statusCode).json({ status: err.status, message: err.message });
  } else {
      res.status(err.statusCode).json({ status: err.status, message: err.message, stack: err.stack });
  }
});

module.exports = app;
