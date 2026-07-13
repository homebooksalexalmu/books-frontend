import { describe, expect, it } from "vitest";
import { IUserRepositoryImpl } from "@/backend/Users/infrastructure/repository/IUserRepositoryImpl";
import { UserModel } from "@/backend/shared/infrastructure/MongoDbClient";
import { UserMother } from "../../domain/UserMother";
import { useInMemoryMongo } from "../../../../helpers/mongo";
import { Random } from "../../../../helpers/Random";

const seedUser = (overrides: Partial<{ email: string; auth0Id: string }> = {}) =>
    new UserModel({
        name: "Alice",
        verified: true,
        email: overrides.email ?? Random.email(),
        picture: Random.url(),
        auth0Id: overrides.auth0Id ?? `auth0|${Random.hexString(10)}`,
    }).save();

describe("IUserRepositoryImpl (integration)", () => {
    useInMemoryMongo();
    const repository = new IUserRepositoryImpl();

    it("returns all users", async () => {
        await Promise.all([seedUser(), seedUser()]);

        await expect(repository.findAll()).resolves.toHaveLength(2);
    });

    it("finds a user by auth0Id", async () => {
        await seedUser({ auth0Id: "auth0|abc" });

        const user = await repository.findOneByAuth0Id("auth0|abc");

        expect(user?.auth0Id).toBe("auth0|abc");
    });

    it("matches by email AND auth0Id together", async () => {
        await seedUser({ email: "a@b.com", auth0Id: "auth0|abc" });

        const user = await repository.findOneByEmailOrAuth0Id("a@b.com", "auth0|abc");

        expect(user?.email).toBe("a@b.com");
    });

    // Regression guard (#28): save() wrongly uses Book.fromPrimitives, so a normal
    // user profile can never be persisted (it throws before reaching Mongo).
    it("cannot persist a user via save (#28)", async () => {
        await expect(repository.save(UserMother.primitives())).rejects.toBeDefined();
        await expect(UserModel.countDocuments()).resolves.toBe(0);
    });

    // Regression guard (#34): a miss makes the factory run on a null document and throw.
    it("throws instead of returning null when the user is not found (#34)", async () => {
        await expect(repository.findOneByAuth0Id("auth0|missing")).rejects.toBeDefined();
    });
});
