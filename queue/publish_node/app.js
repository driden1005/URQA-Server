'use strict';

var gk = require('./common');
process.env.TZ = 'Asia/Seoul';

// express
var express = require('express');

var errorHandler = require('./middleware/error_handler');

// app
var app = express();
app.configure(function() {
    app.set('views', './apiviewer/views');
    app.set('view engine', 'jade');
    app.locals.pretty = true;
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.compress());
    app.use(errorHandler());
});

// router
var router = require('./routes');
router.route(app);

app.listen(gk.config.port);
console.log("Server started at port " + gk.config.port);
