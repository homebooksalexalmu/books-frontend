import { describe, expect, it } from "vitest";
import { BookFactory } from "@/backend/Books/domain/BookFactory";
import { DEFAULT_BOOK_PAGES } from "@/app/utils";
import { Random } from "../../../helpers/Random";

const hamelynProduct = (attributes: Record<string, unknown> = {}) => ({
    _id: Random.isbn13(),
    title: "The Hobbit",
    description: "A tale",
    attributes: {
        authors: ["George Orwell"],
        pages: 310,
        publisher: "Minotauro",
        format: "Tapa dura",
        ...attributes,
    },
});

describe("BookFactory", () => {
    it("uppercases author names", async () => {
        const book = await BookFactory.create(hamelynProduct({ authors: ["George Orwell"] }), Random.url());

        expect(book.authors).toEqual(["GEORGE ORWELL"]);
    });

    it("normalizes 'Lastname, Firstname' into 'Firstname Lastname'", async () => {
        const book = await BookFactory.create(hamelynProduct({ authors: ["Tolkien, J.R.R."] }), Random.url());

        expect(book.authors).toEqual(["J.R.R. TOLKIEN"]);
    });

    it("falls back to the default page count when pages are missing", async () => {
        const book = await BookFactory.create(hamelynProduct({ pages: null }), Random.url());

        expect(book.pages).toBe(DEFAULT_BOOK_PAGES);
    });

    it("starts with no categories and the given cover image", async () => {
        const image = Random.url();
        const book = await BookFactory.create(hamelynProduct(), image);

        expect(book.categories).toEqual([]);
        expect(book.portrait.value).toBe(image);
    });
});
