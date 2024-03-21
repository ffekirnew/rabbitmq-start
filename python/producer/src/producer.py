import json

import pika
from pika.adapters import BlockingConnection


class Producer:
    def __init__(self, queue: str):
        self.queue = queue
        self.connection = self.connect()
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=queue, durable=True)

    def connect(self) -> BlockingConnection:
        connection_parameters = pika.ConnectionParameters("localhost", 5672)
        return pika.BlockingConnection(connection_parameters)

    def publish(self, message: dict):
        self.channel.basic_publish(
            exchange="", routing_key=self.queue, body=json.dumps(message)
        )
        print(f" [x] Sent '{message}'")

    def close(self):
        self.connection.close()


class ProducerFactory:
    @staticmethod
    def create_producer(queue: str) -> Producer:
        return Producer(queue)
