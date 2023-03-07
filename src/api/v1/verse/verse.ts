import express, {Request, Response, Router} from 'express'
import fs, { readdir } from 'fs'
import path from 'path';
// Router
const router: Router = express.Router();

const bookList = fs.readFileSync(path.resolve(__dirname, '../db/books.json'));

router.get("/", (req: Request, res: Response) => {
    const book = req.query['book'];
    const chapter = req.query['chapter'];
    const verses = req.query['verses'];
    const version = req.query['version'] ??= "NIV";

    res.status(201).send({
        book: book,
        chapter: chapter,
        verses: verses,
        version: version
    })
})

module.exports = router;
