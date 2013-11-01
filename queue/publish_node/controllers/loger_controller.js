
'use strict';
var gk             = require('../common');
var mq_pubhandler  = require('../handler/mq_pubhandler');
var queueName      = gk.config.mqQueueName;

//테스트를 위해서
exports.send = function(req, res) {  

  var type      = req.body.type;
  var receivers = req.body.receivers;
  var data      = req.body.data;

  if (receivers == null || data == null) {
    return res.send('wrong usage');
  }

  console.log(receivers);
  console.log(data);

  // TODO: validation check
  var queueName = "urqa-queue";
  var data      = { "receivers": JSON.parse(receivers), "data": data, "type": type };

  var index;
  for(index=1; index < 100; index++){
    mq_pubhandler.publish(queueName, data);
    } //for

  var result;
  result = { 'state': 'OK'};
  res.send(result);

};
