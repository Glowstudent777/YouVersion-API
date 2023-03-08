import express, { Request, Response, Router } from 'express'
import fs, { readdir } from 'fs'
import path from 'path';

// Router
const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {

    const languages = require('../db/langs.json');
    const bookList = require('../db/books.json');
    const baseURL = "https://www.bible.com";

    let book = req.query.book as string;
    const chapter = req.query.chapter ??= "1";
    const verses = req.query.verses ??= "1";
    const language = req.query.lang ??= "en-us";
    const version = req.query.version ??= "NIV";

    type bookObject = {
        book: String,
        aliases: Array<String>,
        chapters: Number
    } 

    if (!book) return res.status(400).send({
        "code": 400,
        "message": "Missing field 'book'"
    });

    book = book.toString();
    const lang = languages[language.toString().toLowerCase()] ??= 1;

    let bookFinder = bookList.books.find((o: bookObject) => o.book.toLowerCase() === book.toLowerCase()) || bookList.books.find((o: bookObject) => o.aliases.includes(book.toUpperCase()));

    if (!bookFinder) return res.status(400).send({
        "code": 400,
        "message": `Could not find book '${book}' by name or alias.`
    });

    let URL = `${baseURL}/${lang}/${bookFinder.aliases[0]}.${chapter}.${verses}.${version}`;
    console.log(URL);

    res.status(201).send({
        book: bookFinder.book,
        chapter: chapter,
        verses: verses,
        version: version
    })
})

module.exports = router;
