import { describe, expect, it } from "vitest";
import { BookId } from "@/backend/Books/domain/BookIdVO";
import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";
import { Random } from "../../../helpers/Random";

describe("BookId", () => {
    it("accepts a valid ISBN-13 / EAN", () => {
        const isbn = Random.isbn13();
        expect(new BookId(isbn).value).toBe(isbn);
    });

    it("accepts a valid ISBN-10", () => {
        expect(new BookId("0306406152").value).toBe("0306406152");
    });

    it("accepts a valid ISBN-10 with the X check digit", () => {
        expect(() => new BookId("097522980X")).not.toThrow();
    });

    it("ignores hyphens and spaces when validating", () => {
        expect(() => new BookId("978-0-306-40615-7")).not.toThrow();
    });

    it("throws for a code with an invalid checksum", () => {
        expect(() => new BookId("9780306406158")).toThrow(InvalidArgumentException);
    });

    it("throws for a non-numeric code", () => {
        expect(() => new BookId("hello")).toThrow(InvalidArgumentException);
    });
});
