//'use strict';

var gk = require('../common');

var amqp = require('amqp');

var self = this;

var _queue = [];

var _isReady = false;

var queueExchange  = "urqa-exchange";
var queueName      = "urqa-queue";

var MAX_RETRY_COUNT = 5;
var retry           = 3;
var connection = amqp.createConnection(gk.config.mq);

connection.addListener('ready', function () {
  console.log("connected to " + connection.serverProperties.product);
  var exchange = connection.exchange(queueExchange ,{ type:"topic", durable:true } );
  _queue[queueName] = exchange;
  _isReady = true;
});

process.addListener('exit', function () {
  console.log('Queue Exit ' + recvCount);
});



exports.publish = function(queueName, msg) {
  retry = retry || 0;
  if (retry > MAX_RETRY_COUNT) { return; }
  if (!_isReady) {
    // TODO: use backoff or wait for it
    process.nextTick(function() { exports.publish (queueName, msg, retry + 1); });
    _isReady = false;
    return;
  }

  if (_queue.hasOwnProperty(queueName)) {
    var ex = _queue[queueName];
    ex.publish(queueName, msg);
    console.log(queueName + ':' + msg);
  } else {
    // TODO: binding queue automatically
    console.log("WhatTheHuck? Couldn't find the queue " + queueName);
    _isReady = false;
  }

};

