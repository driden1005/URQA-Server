'use strict';
var ERR_EXTENSION_CONNECT =  "0x_000001";

var routes = function(app) {
  var push = require(__dirname + '/../controllers/push');

  // push
  app.post('/push/send', push.send);
};
  
exports.route = routes;

