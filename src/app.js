var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const user = require('./routes/user.route')
var UserModel = require('./model/user.model')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users-router', usersRouter);
app.use('/user', user)

// setting MongoDB with Mongoose
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/ecommerce')

// Check token jwt
app.use(function(req, res, next){
  console.log('cookie split :'+req.cookies.jewete.split(' '))
  if (req.cookies.jewete && req.cookies.jewete.split(' ')[0] === 'WIDI'){
        jwt.verify(req.cookies.jewete.split(' ')[1], 'secret', function(err, decode){
          if (err) req.user = undefined
          console.log(err)
          req.user = decode
          next()
        })
      }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// app.use(function(req,res,next){
//   //console.log(req.headers.authorization)
//   if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'WIDI'){
//     jwt.verify(req.headers.authorization.split(' ')[1], 'secret', function(err, decode){
//       if (err) req.user = undefined
//       console.log(err)
//       req.token = req.headers.authorization
//       req.user = decode
//       next()
//     })
//   }
// })

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.use(function(req,res,next){
//   //console.log(req.headers.authorization)
//   if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
//     jwt.verify(req.headers.authorization.split(' ')[1], 'secret', function(err, decode){
//       if (err) req.user = undefined
//       //console.log(err)
//       req.user = decode
//       next()
//     })
//   }
// })

module.exports = app;
