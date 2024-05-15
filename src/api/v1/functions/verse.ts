import axios from 'axios';
import * as cheerio from 'cheerio';

const versions = require('../db/versions.json');
const bookList = require('../db/books.json');
const baseURL = "https://www.bible.com/bible";

type bookType = {
    book: String,
    aliases: Array<String>,
    chapters: Number
}

export const getVerse = async (book: string, chapter: string, verses: string, version: string) => {
    let versionFinder: any = {
        version: Object.keys(versions)[Object.keys(versions).indexOf(version.toLocaleString().toLocaleUpperCase())] ??= "NIV",
        id: versions[version.toString().toLocaleUpperCase()] ??= 1,
    }

    let bookFinder = bookList.books.find((o: bookType) => o.book.toLowerCase() === book.toLowerCase()) || bookList.books.find((o: bookType) => o.aliases.includes(book.toUpperCase()));
    if (!bookFinder) return {code: 400, message: `Could not find book '${book}' by name or alias.`}

    let URL = `${baseURL}/${versionFinder.id}/${bookFinder.aliases[0]}.${chapter}.${verses}`;

    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);

        const unavailable = $("p:contains('No Available Verses')").text();
        if (unavailable) return { code: 400, message: "Verse not found" };

        const versesArray: Array<String> = [];
        const wrapper = $(".text-19");

        await wrapper.each((i, p) => {
            let unformattedVerse = $(p).eq(0).text();
            let formattedVerse = unformattedVerse.replace(/\n/g, ' ');
            versesArray.push(formattedVerse)
        })

        return {
            citation: `${bookFinder.book} ${chapter}:${verses}`,
            passage: versesArray[0]
        }
    } catch (err) {
        console.error(err);
    }
}