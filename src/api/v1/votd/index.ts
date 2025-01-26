import express, { Request, Response, Router } from "express";
import { getVotd } from "../core/functions/votd";
import { getFromCache, getVotdExpireTime, setToCache } from "../../../cache";

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
    getFromCache("votd", async (err, data) => {
      if (data) {
        if (process.env.NODE_ENV === "development")
          console.log("Verse of the day fetched from Memory");
        res.status(200).send(JSON.parse(data));
      } else {
        const lang = (req.query.lang as string) || "en";
        const data = await getVotd(lang);

        setToCache("votd", JSON.stringify(data), getVotdExpireTime());

        if (process.env.NODE_ENV === "development")
          console.log("Verse of the day fetched from API");
        res.status(200).send(data);
      }
    });
  } catch (err: Error | any) {
    res.status(500).send("Error getting verse of the day: " + err.message);
  }
});

module.exports = router;
