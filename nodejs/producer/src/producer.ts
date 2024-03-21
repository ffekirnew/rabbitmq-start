import amqp, { Channel } from "amqplib";

export class Producer {
  private channel: Channel | undefined;
  private queue: string | undefined;

  async connect(queue: string): Promise<void> {
    try {
      const connection = await amqp.connect("amqp://localhost:5672");

      this.queue = queue;
      this.channel = await connection.createChannel();
      await this.channel.assertQueue(this.queue);
    } catch (e) {
      console.error(e);
    }
  }

  async produce(message: object): Promise<void> {
    if (!this.channel || !this.queue) {
      throw new Error("Producer not connected.");
    }

    this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(message)));
  }
}

export class ProducerFactory {
  static async create(queue: string): Promise<Producer> {
    const producer = new Producer();
    await producer.connect(queue);

    return producer;
  }
}
