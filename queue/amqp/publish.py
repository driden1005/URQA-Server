
import sys
import pika
import json

credentials = pika.PlainCredentials('guest', 'guest')
parameters  = pika.ConnectionParameters(host='14.63.164.245', port=5672, credentials=credentials)
connection  = pika.BlockingConnection(parameters)
channel     = connection.channel()

channel.exchange_declare(exchange='urqa-exchange', type='topic',durable=True)
message = { "receivers": JSON.parse(receivers), "data": data, "os": ostype };
  
channel.basic_publish(exchange='urqa-exchange',
                      routing_key='',
                      body=message)
connection.close()
