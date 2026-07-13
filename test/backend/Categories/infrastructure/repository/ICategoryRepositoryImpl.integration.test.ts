import { describe, expect, it } from "vitest";
import { ICategoryRepositoryImpl } from "@/backend/Categories/infrastructure/repository/ICategoryRepositoryImpl";
import { CategoryModel } from "@/backend/shared/infrastructure/MongoDbClient";
import { Criteria } from "@/backend/shared/domain/criteria/Criteria";
import { Filters } from "@/backend/shared/domain/criteria/Filters";
import { Filter } from "@/backend/shared/domain/criteria/Filter";
import { FilterField } from "@/backend/shared/domain/criteria/FilterField";
import { FilterOperator, Operator } from "@/backend/shared/domain/criteria/FilterOperator";
import { FilterValue } from "@/backend/shared/domain/criteria/FilterValue";
import { Order } from "@/backend/shared/domain/criteria/Order";
import { CategoryMother } from "../../domain/CategoryMother";
import { useInMemoryMongo } from "../../../../helpers/mongo";

const seed = (name: string, slug = name.toLowerCase()) => new CategoryModel({ name, slug }).save();

describe("ICategoryRepositoryImpl (integration)", () => {
    useInMemoryMongo();
    const repository = new ICategoryRepositoryImpl();

    it("persists a category with save", async () => {
        await repository.save(CategoryMother.create({ name: "Fantasy", slug: "fantasy" }));

        await expect(CategoryModel.countDocuments()).resolves.toBe(1);
    });

    it("returns all categories", async () => {
        await Promise.all([seed("Fantasy"), seed("Terror")]);

        await expect(repository.findAll()).resolves.toHaveLength(2);
    });

    it("finds a category by slug", async () => {
        await seed("Science Fiction", "sci-fi");

        const category = await repository.findByIdOrSlug("sci-fi");

        expect(category?.name).toBe("Science Fiction");
    });

    it("finds a category by id", async () => {
        const doc = await seed("Poetry", "poetry");

        const category = await repository.findByIdOrSlug(String(doc._id));

        expect(category?.name).toBe("Poetry");
    });

    describe("search (implemented for #46/#44)", () => {
        it("filters by an EQUAL criteria", async () => {
            await Promise.all([seed("Fantasy"), seed("Terror"), seed("Fantasy Epic")]);
            const criteria = new Criteria(
                new Filters([new Filter(new FilterField("name"), new FilterOperator(Operator.EQUAL), new FilterValue("Fantasy"))]),
                Order.none(),
            );

            const results = await repository.search(criteria);

            expect(results).toHaveLength(1);
            expect(results[0].name).toBe("Fantasy");
        });

        it("honours the limit", async () => {
            await Promise.all([seed("A"), seed("B"), seed("C")]);
            const criteria = new Criteria(Filters.none(), Order.none(), 2, 0);

            await expect(repository.search(criteria)).resolves.toHaveLength(2);
        });

        it("returns every category when the criteria has no filters", async () => {
            await Promise.all([seed("A"), seed("B")]);
            const criteria = new Criteria(Filters.none(), Order.none());

            await expect(repository.search(criteria)).resolves.toHaveLength(2);
        });
    });

    // Regression guard (#34): the factory crashes on a null document instead of
    // returning null, so a miss throws rather than yielding "not found".
    it("throws instead of returning null when the term does not match (#34)", async () => {
        await expect(repository.findByIdOrSlug("does-not-exist")).rejects.toBeDefined();
    });
});
