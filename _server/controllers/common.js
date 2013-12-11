'use strict'

var gk = require(__dirname + '/../common');

var common = exports;
var self = common;

self.hello = function (req, res) {
  var result ={};
  result.msg = 'Hello~! I am iFighter Server.';
  gk.helper.generateResult(result, 'Success', null);
  res.send(result);
}

