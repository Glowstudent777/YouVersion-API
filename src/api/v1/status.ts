import express, { Request, Response, Router } from "express";

// Router
const router: Router = express.Router();

/**
 * @swagger
 * /api/v1/status:
 *   get:
 *     summary: Gets the server status
 *     description: Gets the server status
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: OK
 */
router.get("/", (req: Request, res: Response) => {
  res.sendStatus(200).json();
});
module.exports = router;
