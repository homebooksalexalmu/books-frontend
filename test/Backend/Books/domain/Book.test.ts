import { describe, expect, it } from "vitest";
import { Book } from "@/backend/Books/domain/Book";
import { BookMother } from "./BookMother";

describe("Book", () => {
    it("round-trips through fromPrimitives / toPrimitives", () => {
        const primitives = BookMother.primitives();

        const result = Book.fromPrimitives(primitives).toPrimitives();

        expect(result).toEqual(primitives);
    });

    it("wraps the id and portrait in value objects", () => {
        const book = BookMother.create({ _id: "9780306406157" });

        expect(book).toBeInstanceOf(Book);
        expect(book._id.value).toBe("9780306406157");
        expect(book.portrait.value).toBe(book.toPrimitives().portrait);
    });

    it("applies the default cover when no portrait is provided", () => {
        const book = BookMother.create({ portrait: undefined });

        expect(book.portrait.value).toContain("cloudinary.com");
    });
});
