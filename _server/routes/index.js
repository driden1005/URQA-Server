'use strict'

var routes = function(app) {
  var common = require(__dirname + '/../controllers/common');

  // common
  app.post('/hello', common.hello);
}
  
exports.route = routes;

