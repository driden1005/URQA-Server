//'use strict';

var gk = require('../common');

var amqp = require('amqp');

var self = this;

var _queue = [];

var _isReady = false;

// trinitysouls
exports.PUSH_EXCHANGE_NAME = "urqa-exchange";
exports.PUSH_QUEUE_NAME    = "urqa-queue";

var MAX_RETRY_COUNT = 5;

var connection = amqp.createConnection(gk.config.mq);
connection.addListener('ready', function () {
  
  if (connection.serverProperties.product == "RabbitMQ"){
    console.log("connected to " + connection.serverProperties.product);
    _isReady = true;
  }

  connection.queue(exports.PUSH_QUEUE_NAME, {durable: true, autoDelete: false}, function(q) { 
    var queueName = exports.PUSH_QUEUE_NAME;
    console.log('onQueue ' + queueName);
    var exchange = connection.exchange(exports.PUSH_EXCHANGE_NAME, {durable:true, autoDelete:false});
    q.bind(exchange, "*");
    _queue[queueName] = exchange;
  });

});


exports.publish = function(queueName, msg, retry) {
  retry = retry || 0;

  if (retry > MAX_RETRY_COUNT) { return; }

  if (!_isReady) {
    // TODO: use backoff or wait for it
    process.nextTick(function() { exports.publish(queueName, msg, retry + 1); });
    return;
  }

  if (_queue.hasOwnProperty(queueName)) {
    var ex = _queue[queueName];
    ex.publish(queueName, msg);
    console.log(queueName + ':' + msg);
  } else {
    // TODO: binding queue automatically
    console.log("WhatTheHuck? Couldn't find the queue " + queueName);
  }

};

