import express, { Request, Response, Router } from "express";
import { getVotd } from "../core/functions/votd";
import { getVotdExpireTime, redis } from "../../../redis";

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
  try {
    redis.get("votd", async (err, data) => {
      if (data) {
        console.log("Verse of the day fetched from Redis");
        res.status(200).send(JSON.parse(data));
      } else {
        const lang = (req.query.lang as string) || "en";
        const data = await getVotd(lang);

        redis.set("votd", JSON.stringify(data), "EX", getVotdExpireTime());

        console.log("Verse of the day fetched from API");
        res.status(200).send(data);
      }
    });
  } catch (err: Error | any) {
    res.status(500).send("Error getting verse of the day: " + err.message);
  }
});

module.exports = router;
