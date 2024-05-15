import express, { Request, Response, Router } from 'express'
import axios from 'axios';
import * as cheerio from 'cheerio';
import { getVotd } from '../functions/votd';

// Router
const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const data = await getVotd();
    res.status(200).send(data);
})

module.exports = router;