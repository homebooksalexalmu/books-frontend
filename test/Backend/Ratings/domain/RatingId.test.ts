import { describe, expect, it } from "vitest";
import { RatingId } from "@/backend/Ratings/domain/RatingId";
import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";
import { Random } from "../../../helpers/Random";

describe("RatingId", () => {
    it("accepts a valid ObjectId", () => {
        const id = Random.objectId();
        expect(new RatingId(id).value).toBe(id);
    });

    it("throws for an invalid ObjectId", () => {
        expect(() => new RatingId("nope")).toThrow(InvalidArgumentException);
    });
});
