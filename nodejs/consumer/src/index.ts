import { ConsumerFactory } from "./consumer";

async function init() {
  const consumer = await ConsumerFactory.create("jobs");
  console.log("Consumer is connected to queue:", consumer.queue);
}

init().catch((error) => {
  console.log(error);
});
