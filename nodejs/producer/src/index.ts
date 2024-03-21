import express, { Express } from "express";
import { Producer, ProducerFactory } from "./producer";
import cors from "cors";

const app: Express = express();
let producer: Producer;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

async function init() {
  producer = await ProducerFactory.create("jobs");
  console.log("Producer is connected.");
}

app.post("/publish", (req, res) => {
  producer.produce({ message: req.body.message });
  res.send("Message has been sent!");
});

app.listen(3000, async () => {
  await init();
  console.log("Server is running on port: 3000.");
});
