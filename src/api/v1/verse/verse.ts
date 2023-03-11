import express, { Request, Response, Router } from 'express'
import axios from 'axios';
import * as cheerio from 'cheerio';

// Router
const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {

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

    console.log(bookList.books.forEach((book: any) => {
        console.log(book.book, book.aliases[0])  
    }))

    let bookFinder = bookList.books.find((o: bookObject) => o.book.toLowerCase() === book.toLowerCase()) || bookList.books.find((o: bookObject) => o.aliases.includes(book.toUpperCase()));

    if (!bookFinder) return res.status(400).send({
        "code": 400,
        "message": `Could not find book '${book}' by name or alias.`
    });

    let URL = `${baseURL}/${lang}/${bookFinder.aliases[0]}.${chapter}.${verses}.${version}`;
    const citation = `${bookFinder.book} ${chapter}:${verses} ${version}`

    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);

        const lastVerse = $(".label").eq(-1).text();
        if (lastVerse) throw new Error("Verse not found");
        if (+chapter > bookFinder.chapters) throw new Error("Chapter not found.");

        const versesArray: Array<String> = [];
        const wrapper = $(".lh-copy");

        await wrapper.each((i, p) => {
            let unformattedVerse = $(p).eq(0).text();
            let formattedVerse = unformattedVerse.replace(/\n/g, ' ');
            versesArray.push(formattedVerse)
        })

        return res.status(200).send({
            citation: citation,
            passage: versesArray[0]
        })
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;
