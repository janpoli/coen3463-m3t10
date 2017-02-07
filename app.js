var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    expressValidator = require('express-validator'),
    flash = require('connect-flash'),
    LocalStrategy = require('passport-local').Strategy;

const methodOverride = require('method-override');
const restify = require('express-restify-mongoose');
const router = express.Router();

// var db = require('./model/db');
var blob = require('./model/blobs');
var mongoose = require('mongoose');

var routes = require('./routes/index'),
    blobs = require('./routes/blobs'),
    users = require('./routes/users'),
    auth = require('./routes/auth'),
    home = require('./routes/home');

//var users = require('./routes/users');

var app = express();


var MongoURI = 'mongodb://admin:password@ds111549.mlab.com:11549/coen3463-team10'

// mongoose.connect('mongodb://admin:password@ds111549.mlab.com:11549/coen3463-team10');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// passport init
app.use(passport.initialize());
app.use(passport.session());

// express ealidator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// connect flash
app.use(flash());

// global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  res.locals.errors = req.flash('errors');
  next();
}); 

mongoose.connect(MongoURI, function(err, res) {
     if (err) {
         console.log('Error connecting to ' + MongoURI);
     } else {
         console.log('MongoDB connected!');
     }
 });
 
restify.serve(router, blob);
app.use(router)


app.use('/', routes);
app.use('/blobs', blobs);
app.use('/users', users);
app.use('/auth', auth);
app.use('/home', home);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




module.exports = app;
