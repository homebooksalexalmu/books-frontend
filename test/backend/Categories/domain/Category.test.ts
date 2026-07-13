import { describe, expect, it } from "vitest";
import { Category } from "@/backend/Categories/domain/Category";
import { CategoryMother } from "./CategoryMother";
import { Random } from "../../../helpers/Random";

describe("Category", () => {
    describe("fromPrimitives", () => {
        it("preserves the persisted slug instead of regenerating it from the name (#46)", () => {
            const primitives = CategoryMother.primitives({ name: "Science Fiction", slug: "custom-sci-fi" });

            const category = Category.fromPrimitives(primitives);

            expect(category.slug.value).toBe("custom-sci-fi");
        });

        it("round-trips through toPrimitives keeping the stored slug", () => {
            const primitives = CategoryMother.primitives({ name: "Poetry", slug: "custom-poetry" });

            const result = Category.fromPrimitives(primitives).toPrimitives();

            expect(result.slug).toBe("custom-poetry");
            expect(result.name).toBe("Poetry");
            expect(result._id).toBe(primitives._id);
        });

        it("falls back to a name-derived slug when no slug is stored", () => {
            const primitives = CategoryMother.primitives({ name: "Historical Novel" });
            // Simulate a legacy document without a slug.
            const category = Category.fromPrimitives({ ...primitives, slug: "" });

            expect(category.slug.slug).toBe("historical-novel");
        });
    });

    describe("factory", () => {
        it("uses the name to build the slug when the slug is missing", () => {
            const category = CategoryMother.create({ name: "Graphic Novels", slug: "" });

            expect(category.slug.slug).toBe("graphic-novels");
        });

        it("builds a Category instance", () => {
            expect(CategoryMother.create()).toBeInstanceOf(Category);
        });
    });
});
