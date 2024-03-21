import pika
from pika.adapters import BlockingConnection


class Subscriber:
    def __init__(self, queue: str) -> None:
        self.queue = queue
        self.connection = self.connect()

        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=queue, durable=True)

        # Consume messages from the queue
        self.channel.basic_consume(
            queue=queue, on_message_callback=self.callback, auto_ack=True
        )

    def callback(self, ch, method, properties, body) -> None:
        print(f"Received {body}")

    def connect(self) -> BlockingConnection:
        connection_parameters = pika.ConnectionParameters("localhost", 5672)
        return pika.BlockingConnection(connection_parameters)


class SubscriberFactory:
    @staticmethod
    def create_subscriber(queue: str) -> Subscriber:
        return Subscriber(queue)
