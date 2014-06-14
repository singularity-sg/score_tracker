var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var refresh = require('./routes/refresh');
var update = require('./routes/update');
var scorecard = require('./routes/scorecard');

var app = express();

global.maxScore=100;
global.sheng_housescores = [
    {'name':'Falcon', 'score':0, 'class':'falcon'},
    {'name':'Robin', 'score':0, 'class':'robin'},
    {'name':'Eagle', 'score':0, 'class':'eagle'},
    {'name':'Swift', 'score':0, 'class':'swift'},
    {'name':'Hawk', 'score':0, 'class':'hawk'}
    ];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/refresh', refresh);
app.use('/update', update);
app.use('/scorecard', scorecard);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
