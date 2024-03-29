import express, { Request, Response, Router } from 'express'
import axios from 'axios';
import * as cheerio from 'cheerio';

// Router
const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const URL = "https://www.bible.com/verse-of-the-day";
    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);

        const versesArray: Array<String> = [];
        const citationsArray: Array<String> = [];
        const imageArray: Array<String> = [];

        const verses = $("a.text-gray-50");
        const citations = $("p.text-gray-25");
        const images = $("a.block");

        await citations.each((i, p) => {
            let citation = $(p).eq(0).text();
            citationsArray.push(citation)
        })

        await verses.each((i, p) => {
            let unformattedVerse = $(p).eq(0).text();
            let formattedVerse = unformattedVerse.replace(/\n/g, ' ');
            versesArray.push(formattedVerse)
        })

        await images.each((i, p) => {
            let image = `https://www.bible.com${$(p).find('img').attr()?.src}`
            imageArray.push(image);
        })

        return res.status(200).send({
            citation: citationsArray[0],
            passage: versesArray[0],
            image: imageArray ?? []
        })
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;