import { getVerse } from "../src/api/v1/core/functions/verse";
import { expect, it, describe } from "vitest";

describe("getChapter", () => {
  it("John 1", async () => {
    const verse = await getVerse("John", "1", "-1", "NIV");

    expect(verse?.citation).toBe("John 1");
    expect(verse?.verses?.[1]).toBe(
      "In the beginning was the Word, and the Word was with God, and the Word was God."
    );
    expect(verse?.title).toBe("The Word Became Flesh");
  });
});
