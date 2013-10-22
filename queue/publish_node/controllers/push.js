'use strict';

var gk   = require('../common');
var mq   = require('../handler/amqp_handler');

/*
URL   : http://192.168.0.13:9876/push/send
Method: POST

Params:
- type: string (if or ts)
- data: string (ex, WhatThe!!!!)
- ostype  : string (android or ios)
- receivers: json array (ex, ["DeviceKey1", "DeviceKey2"])
*/

exports.send = function(req, res) {
  var gametype  = req.body.gametype;
  var receivers = req.body.receivers;
  var data      = req.body.data;

  if (receivers == null || data == null || ostype == null) {
    return res.send('wrong usage');
  }

  console.log(receivers);
  console.log(data);

  // TODO: validation check
  var queueName = "ruqa-queue";
  var pushdata = { "receivers": JSON.parse(receivers), "data": data, "os": ostype };
  mq.publish(queueName, pushdata);
 
  var result = { 'state': 'OK'};
  res.send(result);

};
