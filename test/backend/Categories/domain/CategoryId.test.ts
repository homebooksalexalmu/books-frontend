import { describe, expect, it } from "vitest";
import { CategoryId } from "@/backend/Categories/domain/CategoryId";
import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";
import { Random } from "../../../helpers/Random";

describe("CategoryId", () => {
    it("accepts a valid ObjectId", () => {
        const id = Random.objectId();
        expect(new CategoryId(id).value).toBe(id);
    });

    it("throws for a non-ObjectId string", () => {
        expect(() => new CategoryId("not-an-object-id")).toThrow(InvalidArgumentException);
    });
});
