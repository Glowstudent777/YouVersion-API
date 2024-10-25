import express, { Request, Response, Router } from 'express'
import axios from 'axios';
import * as cheerio from 'cheerio';
import { getVotd } from '../functions/votd';

// Router
const router: Router = express.Router();

/**
 * @swagger
 * /api/v1/votd:
 *   get:
 *     summary: Verse of the day
 *     tags: [Bible]
 *     parameters:
 *       - name: lang
 *         in: query
 *         required: false
 *         description: |
 *              Language code for the verse of the day (e.g., sk, en, fr, de). Defaults to 'en' if not provided. 
 *              You can provide list of comma separated languages. First found language is returned.
 *         schema:
 *           type: string
 *           example: sk,en,de
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: OK
 */
router.get("/", async (req: Request, res: Response) => {
    const lang = req.query.lang as string || "en";
    const data = await getVotd(lang);
    res.status(200).send(data);
})

module.exports = router;