var config = require(__dirname + '/../config');
var winston = require('winston');

// set logging level
var loggerConfig = {
  levels: {
    verbose: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    file: 5
  },
  colors: {
    verbose: 'blue',
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'green',
    file: 'white'
  }
};

var serverLogger = new (winston.Logger)({ levels: loggerConfig.levels });
winston.addColors(loggerConfig.colors);

// add logging transports
if (config.logging) {
  try {
    winston.remove(winston.transports.Console);
    serverLogger.remove(winston.transports.Console);
  } catch (e) { }

  var detail, type;
  for (var i = 0; i < config.logging.length; i++) {
    detail = config.logging[i];
    type = detail.type;
    delete detail.type;
    winston.add(winston.transports[type], detail);
    serverLogger.add(winston.transports[type], detail);
  }
}

//winston.info("gklogger(using RabbitMQ and fluentd) initialized");
serverLogger.info("gklogger(using Rabbit MQ and fluentd) initialized");

//module.exports = winston;
module.exports = serverLogger;
