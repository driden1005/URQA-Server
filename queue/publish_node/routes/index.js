'use strict'

var loger = require(__dirname + '/../controllers/loger_controller');

var routes = function(app) {
  // common
  app.post('/loger/send', loger.send);
}
  
exports.route = routes;

