import { describe, expect, it } from "vitest";
import { UserId } from "@/backend/Users/domain/UserId";
import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";
import { Random } from "../../../helpers/Random";

describe("UserId", () => {
    it("accepts a valid ObjectId", () => {
        const id = Random.objectId();
        expect(new UserId(id).value).toBe(id);
    });

    it("throws for an invalid ObjectId", () => {
        expect(() => new UserId("123")).toThrow(InvalidArgumentException);
    });
});
