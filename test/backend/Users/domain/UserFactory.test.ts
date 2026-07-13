import { describe, expect, it } from "vitest";
import { User } from "@/backend/Users/domain/User";
import { UserMother } from "./UserMother";

describe("UserFactory", () => {
    it("creates a User domain object from persistence props", () => {
        const primitives = UserMother.primitives();
        const user = UserMother.create(primitives);

        expect(user).toBeInstanceOf(User);
        expect(user.email).toBe(primitives.email);
        expect(user.auth0Id).toBe(primitives.auth0Id);
        expect(user._id?.value).toBe(primitives._id);
    });
});
