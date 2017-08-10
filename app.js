var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var analytics = require("./misc/analytics");

var events = require("events");

var routes = require('./routes/index');
var about = require('./routes/about');
var users = require('./routes/users');
var queryMovie = require('./routes/queryMovie');
var getGuideBox = require('./routes/getGuideBox');
var getGuideTV = require('./routes/getGuideTV');
var getOMDB = require('./routes/getOMDB');
var getNetflix = require('./routes/getNetflix');
var getMobile = require('./routes/getMobileRes');
var getFlix = require('./routes/getFlix');
var getO = require("./routes/getO");


var gMT = require('./routes/getMobileTMDB');

var gMI = require("./routes/getMobileInstant");

var getBrowse = require("./routes/getBrowse");


// set up the event listener for background caching 
require("./misc/offload");





var app = express();

require( "console-stamp" )( console, { pattern : "dd/mm/yyyy HH:MM:ss.l" } );
//be able to get IP from 404 or err
app.enable('trust proxy');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'webapp')));

//access control origin
app.use(function(req,res,next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
	next();
});

//app.use('/', routes);
app.use('/users', users);
app.use('/queryMovie', queryMovie);
app.use('/getGuideBox', getGuideBox);
app.use('/getGuideTV', getGuideTV);
app.use('/getOMDB', getOMDB);
app.use('/getNetflix', getNetflix);
app.use('/getMobile', getMobile);
app.use('/getFlix', getFlix);
app.use('/getO', getO);
app.use('/about', about);

app.use('/gMI', gMI);
app.use('/gMT', gMT);

app.use('/browse', getBrowse);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  console.error('404 from IP  ', req.ip, req.ips);

  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.error(err);
    console.log(err.stack);
    var theStatus = err.status || 500,
        oURL = req.originalUrl || "none",
        eMessage = err.message || "none";
    analytics.errorReport(req.ip, theStatus, oURL, eMessage);


    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      stack: err.stack,
      error: {},
      ip: req.ip
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error('err from IP  ', req.ip, req.ips);
  var theStatus = err.status || 500,
      oURL = req.originalUrl || "none",
      eMessage = err.message || "none";
  analytics.errorReport(req.ip, theStatus, oURL, eMessage);

  res.render('error', {
    message: err.message,
    error: {},
    ip: req.ip
  });
});


module.exports = app;
