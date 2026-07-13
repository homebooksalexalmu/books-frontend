import { describe, expect, it } from "vitest";
import { IRatingRepositoryImpl } from "@/backend/Ratings/infrastructure/repository/IRatingRepositoryImpl";
import { RatingModel } from "@/backend/shared/infrastructure/MongoDbClient";
import { BookId } from "@/backend/Books/domain/BookIdVO";
import { RatingId } from "@/backend/Ratings/domain/RatingId";
import { RatingMother } from "../../domain/RatingMother";
import { useInMemoryMongo } from "../../../../helpers/mongo";
import { Random } from "../../../../helpers/Random";

const seedRating = (overrides: Partial<{ isbn: string; user: string; rate: number }> = {}) =>
    new RatingModel({
        isbn: overrides.isbn ?? Random.isbn13(),
        user: overrides.user ?? Random.objectId(),
        rate: overrides.rate ?? 3,
    }).save();

describe("IRatingRepositoryImpl (integration)", () => {
    useInMemoryMongo();
    const repository = new IRatingRepositoryImpl();

    it("persists a rating with create", async () => {
        await repository.create(RatingMother.create({ rate: 5 }));

        await expect(RatingModel.countDocuments()).resolves.toBe(1);
    });

    it("returns all ratings", async () => {
        await Promise.all([seedRating(), seedRating()]);

        await expect(repository.findAll()).resolves.toHaveLength(2);
    });

    it("finds ratings by isbn", async () => {
        const isbn = Random.isbn13();
        await Promise.all([seedRating({ isbn, rate: 4 }), seedRating({ isbn: Random.isbn13() })]);

        const results = await repository.findByIsbn(new BookId(isbn));

        expect(results).toHaveLength(1);
        expect(results[0].rate).toBe(4);
    });

    it("updates the rate when given a plain id", async () => {
        const doc = await seedRating({ rate: 2 });

        await repository.update(String(doc._id) as unknown as RatingId, 5);

        const reloaded = await RatingModel.findById(doc._id);
        expect(reloaded?.rate).toBe(5);
    });

    // Passing a RatingId value object also persists: Mongoose casts the VO to an
    // ObjectId via toString(), so `{ _id: <VO> }` matches. (Documents actual
    // behaviour at this layer — the #31 symptom does not originate here.)
    it("also updates when given a RatingId value object", async () => {
        const doc = await seedRating({ rate: 2 });

        await repository.update(new RatingId(String(doc._id)), 5);

        const reloaded = await RatingModel.findById(doc._id);
        expect(reloaded?.rate).toBe(5);
    });
});
