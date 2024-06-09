import { getVerse } from "../src/api/v1/functions/verse";
import { expect, it, describe } from 'vitest';

describe("getVerse", () => {
    it("John 3:16", async () => {
        const verse = await getVerse("John", "3", "16", "NIV");

        expect(verse?.citation).toBe("John 3:16");
        expect(verse?.passage).toBe("For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.");
    });

    it("Genesis 1:1", async () => {
        const verse = await getVerse("GEN", "1", "1", "KJV");

        expect(verse?.citation).toBe("Genesis 1:1");
        expect(verse?.passage).toBe("In the beginning God created the heaven and the earth.");
    });

    it("Invalid verse", async () => {
        const verse = await getVerse("JHN", "3", "54", "NIV");

        expect(verse?.code).toBe(400);
        expect(verse?.message).toBe("Verse not found");
    });

    it("Invalid book", async () => {
        const book = "Coffee";
        const verse = await getVerse(book, "5", "11", "NIV");

        expect(verse?.code).toBe(400);
        expect(verse?.message).toBe(`Could not find book '${book}' by name or alias.`);
    });
});
