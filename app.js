var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var session = require('express-session');
var mw = require('./lib/middlewares');

require('dotenv').config();

var config = require('./config');


// Get a database connection here
mongoose.connect(config.mongoUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error'));

db.once('open', function() {
    // Connection made
    console.log("Connected to database server correctly!");
});

//Get the route information
var activityRoute = require('./routes/activityRouter');
var userRoute = require('./routes/userRouter');
var titleRoute = require('./routes/titleRouter');
var noticeRoute = require('./routes/noticeRouter');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({secret: 'Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch', saveUninitialized: false, resave: false}));
//app.use(mw.protect);
// If you want authentication use Passport here.

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', activityRoute);
app.use('/user', userRoute);
app.use('/title', titleRoute);
app.use('/notice', noticeRoute);

//Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.locals.isLoggedIn = false;

//Development error handler - will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

//Production error handler - will not  print stacktrace
if (app.get('env') === 'production') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
          res.render('error', {
              message: err.message,
              error: {}
          });
    });
}

module.exports = app;
