import axios from 'axios';
import * as cheerio from 'cheerio';
import { version } from 'os';

const URL = "https://www.bible.com/verse-of-the-day";
export const getVotd = async () => {
    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);

        const imageArray: Array<String> = [];

        // Nextjs way :)
        const nextWay = $("script#__NEXT_DATA__").eq(0);
        if (nextWay != null) {
            let json = JSON.parse(nextWay.html() || "");
            const verse = json.props.pageProps.verses[0].content.replace(/\n/g, ' ');
            const reference = json.props.pageProps.verses[0].reference.human;
            const version = json.props.pageProps.versionData.abbreviation;
            
            const images = $("a.block");
            await images.each((i, p) => {
                let image = `https://www.bible.com${$(p).find('img').attr()?.src}`
                imageArray.push(image);
            })

            return {
                citation: `${reference}`,
                passage: verse,
                images: imageArray ?? [],
                version: version
            }
        }
        // Old way :(
        else {
            const versesArray: Array<String> = [];
            const citationsArray: Array<String> = [];
            let version;

            const verses = $("a.text-text-light.w-full.no-underline");
            const citations = $("p.text-gray-25");
            const images = $("a.block");

            await citations.each((i, p) => {
                let citation = $(p).eq(0).text();

                // cut the ending (ESV), (NIV), etc and store it in version
                version = citation.slice(-4).replace(/[()]/g, '');

                // cut the version from the citation
                citation = citation.slice(0, -6);

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

            return {
                citation: citationsArray[0],
                passage: versesArray[0],
                image: imageArray ?? [],
                version: version
            }
        }
    } catch (err) {
        console.error(err);
    }
}
