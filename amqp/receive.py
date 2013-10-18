import sys
import pika
import json

import logging
#logging.getLogger('pika').setLevel(logging.DEBUG)
logger = logging.getLogger('worker')
handler = logging.FileHandler('/home/gumidev/workspace//log/worker.log')
formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

credentials = pika.PlainCredentials('guest', 'guest')
parameters  = pika.ConnectionParameters(host='14.63.164.245', port=5672, credentials=credentials)
connection  = pika.BlockingConnection(parameters)
channel     = connection.channel()

channel.queue_declare(queue='urqa-queue',durable= True, auto_delete=False)

#channel.basic_publish(exchange = 'urqa-exchange')
print " [*] Waiting for messages. To exit press CTRL+C"
logger.info(" [*] Waiting for messages. To exit press CTRL+C")
#print " [*] Waiting for messages. To exit press CTRL+C"

def callback(ch, method, properties, body):
    print " [x] Received %r\n\n" % (body,)
    try:
        data = json.loads(body)
    except (ValueError):
        logger.error('JSON TypeError')
        return

    fields = ['receivers', 'data'];
    result = filter(lambda x: x in data, fields)
    if len(result) != len(fields):
        logger.error('Get off')
        return

    receivers = data['receivers']
    message   = data['data']
    ostype    = data['os']

    if type(receivers) is not list:
        logger.error('Invalid receivers')
        return

if __name__ == '__main__':
    try:
        channel.basic_consume(callback, queue='urqa-queue', no_ack=True)
        channel.start_consuming()
    except (KeyboardInterrupt):#, SystemExit):
        logger.debug('Program Exit....\n')
	channel.stop_consuming()
    connection.close()
    sys.exit(1)
