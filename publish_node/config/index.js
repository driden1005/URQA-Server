var os = require('os');
var hostname = os.hostname();

var config = null;
var code = require('./code.json');

if (true) {
  config = require('./dev.json');
}

config['code'] = code;

module.exports = config;

