import express from "express";
import "dotenv/config";
import { router } from "./routes";

const app = express();

const PORT = process.env.PORT;

app.use(express.json())

app.use(router);

app.listen(PORT, () => {
  console.log(`Conectado na porta ${PORT}`);
});
