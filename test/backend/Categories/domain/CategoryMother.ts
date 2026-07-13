import { Category } from "@/backend/Categories/domain/Category";
import { CategoryFactory } from "@/backend/Categories/domain/CategoryFactory";
import { CategoryProps } from "@/backend/Categories/infrastructure/database/Category.schema";
import { Random } from "../../../helpers/Random";

export interface CategoryPrimitives {
    _id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

export class CategoryMother {
    static primitives(overrides: Partial<CategoryPrimitives> = {}): CategoryPrimitives {
        const name = overrides.name ?? Random.word("Category");
        return {
            _id: Random.objectId(),
            name,
            slug: name.toLowerCase().replace(/\s+/g, "-"),
            createdAt: Random.date(),
            updatedAt: Random.date(),
            ...overrides,
        };
    }

    /** Builds a domain Category through the factory (infrastructure -> domain). */
    static create(overrides: Partial<CategoryPrimitives> = {}): Category {
        return CategoryFactory.create(CategoryMother.primitives(overrides) as unknown as CategoryProps);
    }

    /** Builds a domain Category through the persistence round-trip entry point. */
    static fromPrimitives(overrides: Partial<CategoryPrimitives> = {}): Category {
        return Category.fromPrimitives(CategoryMother.primitives(overrides));
    }
}
