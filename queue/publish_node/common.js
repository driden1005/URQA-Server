// define common variables

module.exports = common = {
//  async:new (require('gkasync')),
//  _:require('underscore')._,
  config:require(__dirname + '/config'),
//  store:function (aid) {
//    return require(__dirname + '/utils/store').store(aid);
//  },
  log:require(__dirname + '/utils/gklogger'),
  helper:require(__dirname + '/utils/helper')
};




