'use strict'

var logger = require(__dirname + '/controllers/logger_controller');

var routes = function(app) {
  // common
  app.post('/logger/send', logger.send);
}
  
exports.route = routes;

