import express, {Express} from 'express'
import dotEnvExtended from 'dotenv-extended'

import api from './api/index';

dotEnvExtended.load()

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api", api);

app.listen(port, () => {
    console.log(`⚡️[Server]: Server is running at http://localhost:${port}`);
});

export default app;
