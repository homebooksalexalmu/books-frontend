import { describe, expect, it } from "vitest";
import { User } from "@/backend/Users/domain/User";
import { UserMother } from "./UserMother";

describe("User", () => {
    it("round-trips through fromPrimitives / toPrimitives", () => {
        const primitives = UserMother.primitives();

        const result = User.fromPrimitives(primitives).toPrimitives();

        expect(result).toEqual(primitives);
    });

    it("wraps the id in a UserId value object", () => {
        const user = UserMother.create({ _id: "507f1f77bcf86cd799439011" });

        expect(user._id?.value).toBe("507f1f77bcf86cd799439011");
    });
});
