import { describe, expect, it } from "vitest";
import { CategorySlug } from "@/backend/Categories/domain/CategorySlug";
import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";

describe("CategorySlug", () => {
    it("slugifies a plain name", () => {
        expect(new CategorySlug("Fantasy Books").slug).toBe("fantasy-books");
    });

    it("strips accents and diacritics", () => {
        expect(new CategorySlug("Ciencia Ficción").slug).toBe("ciencia-ficcion");
    });

    it("removes non-alphanumeric characters", () => {
        expect(new CategorySlug("Cómics & Manga!").slug).toBe("comics-manga");
    });

    it("collapses repeated spaces into a single dash", () => {
        expect(new CategorySlug("Novela    Negra").slug).toBe("novela-negra");
    });

    it("keeps the original name available through value", () => {
        expect(new CategorySlug("Terror Gótico").value).toBe("Terror Gótico");
    });

    it.each(["", "   "])("throws for empty or blank names (%j)", (name) => {
        expect(() => new CategorySlug(name)).toThrow(InvalidArgumentException);
    });
});
