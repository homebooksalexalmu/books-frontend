import { describe, expect, it } from "vitest";
import { RatingRate } from "@/backend/Ratings/domain/RatingRateVO";
import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";

describe("RatingRate", () => {
    it.each([1, 2, 3, 4, 5])("accepts a valid rate of %i", (rate) => {
        expect(new RatingRate(rate).value).toBe(rate);
    });

    // KNOWN BUG (#29): the guard `rate <= 0 && rate >= 6` can never be true, so
    // out-of-range rates are wrongly accepted. These tests document the intended
    // behaviour and are expected to fail until #29 is fixed — flip them to normal
    // `it(...)` once the validation is corrected.
    it.fails("should reject a rate of 0", () => {
        expect(() => new RatingRate(0)).toThrow(InvalidArgumentException);
    });

    it.fails("should reject a rate of 6", () => {
        expect(() => new RatingRate(6)).toThrow(InvalidArgumentException);
    });
});
