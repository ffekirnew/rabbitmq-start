import amqp, { Channel } from "amqplib";

export class Consumer {
  private channel: Channel | undefined;
  public queue: string | undefined;

  async connect(queue: string): Promise<void> {
    console.log(amqp.credentials);
    try {
      const connection = await amqp.connect("amqp://localhost:5672");

      this.queue = queue;
      this.channel = await connection.createChannel();
      await this.channel.assertQueue(this.queue);

      await this.channel.consume(queue, (message) => {
        if (message === null) {
          return;
        }

        const parsedMessage = JSON.parse(message.content.toString());
        console.log("Recieved message: ", parsedMessage);
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export class ConsumerFactory {
  static async create(queue: string): Promise<Consumer> {
    const consumer = new Consumer();
    await consumer.connect(queue);

    return consumer;
  }
}
