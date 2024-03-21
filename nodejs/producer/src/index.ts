import express, { Express } from "express";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.listen(3000, async () => {
  await init();
  console.log("Server is running on port: 3000.");
});
