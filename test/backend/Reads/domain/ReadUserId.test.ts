import { describe, expect, it } from "vitest";
import { ReadUserId } from "@/backend/Reads/domain/ReadUserId";
import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";
import { Random } from "../../../helpers/Random";

describe("ReadUserId", () => {
    it("accepts a valid ObjectId", () => {
        const id = Random.objectId();
        expect(new ReadUserId(id).value).toBe(id);
    });

    it("throws for an invalid ObjectId", () => {
        expect(() => new ReadUserId("invalid")).toThrow(InvalidArgumentException);
    });
});
