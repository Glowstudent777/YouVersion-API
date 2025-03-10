import express, { Express } from "express";
import dotEnvExtended from "dotenv-extended";
import api from "./api/index";
import { addSwagger } from "./swagger";
import { clearVotdCache } from "./cache";

dotEnvExtended.load();

const app: Express = express();
const port = process.env.PORT ?? 3000;

clearVotdCache();

app.use(express.json());
app.use("/api", api);

addSwagger(app);

app.listen(port, () => {
  console.log(`⚡️[Server]: Server is running at http://localhost:${port}`);
});

export default app;
