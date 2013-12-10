'use strict';

var gk             = require('../common');

//var AccountHandler = require('../handler/account');
//var UserHandler    = require('../handler/user');
var _helper = require(__dirname + '/../controllers/helper');

// keys
var _keyPrefix = gk.config.redis.namespace;
var _baseKey = _keyPrefix + ':accounts:';

var _tokensKey = _baseKey + 'tokens';


module.exports = function() {
  return function(req, res, next) {    
    gk.log.debug('[REQUEST URL] ',      req.url);
    gk.log.debug('[REQUEST PARAMS]===>> ', req.body);
    if (isNotNeedToBeChecked(req.url)) {
      return next();
    }

    var result = {};
    var token = req.body.token;
    if (token == null || token.length == 0) {
      return sendResult(res, result, 'MissingToken');
    }
/*
    try{
      AccountHandler.compareToken(token, function(err, aid) {
        if (err || aid == null) { 
          gk.log.error(err);
          err = 'NotMatchedToken';
          return sendResult(res, result, err);
        }
        logger.access(aid, req.url, true, parseInt(0));
        req.body.aid = aid;
        next();
      });

    }catch(e){
      return sendResult(res, result, '');
    }
*/

  }
};


function isNotNeedToBeChecked(path) {
  var paths = ['/api', '/account', '/remoteapi', '/kakao/friends', '/patch', '/user/setup'];
  for (var i = 0; i < paths.length; i++) {
    if (path.substr(0, paths[i].length) == paths[i]) return true;
  }

  return false;
}


function sendResult(res, result, err) {
  _helper.generateResult(result, err, err);
  res.send(result);
}
