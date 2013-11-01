'use strict';

var _config = require(__dirname + '/../config');
var _code = _config.code;

exports.generateResult = function(data, state, err) {
  var result = { 'success': true, 'code': _code[state] };
  if (_config.dev) {
    result['msg'] = state;
  }
  if (err) {
    var code = _code[err];
    code = code || 99999;
    result = { 'success': false, 'code': code, 'msg': err };
  };
  return data['result'] = result;
}
