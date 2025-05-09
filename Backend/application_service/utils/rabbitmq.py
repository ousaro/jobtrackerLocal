from django.conf import settings
import pika
import json

def publish_event(event, payload):
    params = pika.URLParameters(settings.RABBITMQ_URL)
    connection = pika.BlockingConnection(params)
    channel = connection.channel()
    channel.exchange_declare(exchange=settings.RABBITMQ_EXCHANGE, exchange_type=settings.RABBITMQ_EXCHANGE_TYPE, durable=True)

    channel.basic_publish(
        exchange=settings.RABBITMQ_EXCHANGE,
        routing_key=event,  # e.g., "application.created"
        body=json.dumps(payload),
        properties=pika.BasicProperties(
            delivery_mode=2,  # makes message persistent
        )
    )
    connection.close()
