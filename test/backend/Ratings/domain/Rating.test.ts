import { describe, expect, it } from "vitest";
import { RatingMother } from "./RatingMother";

describe("Rating", () => {
    it("exposes its data as primitives", () => {
        const primitives = RatingMother.primitives({ rate: 4 });
        const rating = RatingMother.create(primitives);

        expect(rating.toPrimitives()).toEqual({
            _id: primitives._id,
            user: primitives.user,
            rate: 4,
            isbn: primitives.isbn,
            createdAt: primitives.createdAt,
            updatedAt: primitives.updatedAt,
        });
    });

    it("keeps value objects for its identifiers", () => {
        const rating = RatingMother.create();

        expect(rating._id.value).toBe(rating.toPrimitives()._id);
        expect(rating.isbn.value).toBe(rating.toPrimitives().isbn);
        expect(rating.user.value).toBe(rating.toPrimitives().user);
    });
});
