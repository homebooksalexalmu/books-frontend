import { CategoryProps } from "../infrastructure/database/Category.schema";
import { Category } from "./Category";
import { CategoryId } from "./CategoryId";
import { CategorySlug } from "./CategorySlug";

export class CategoryFactory {
    static create(category: CategoryProps): Category {
        return new Category({
            _id: new CategoryId(category._id),
            name: category.name,
            slug: category.slug ? new CategorySlug(category.slug) : new CategorySlug(category.name),
            createdAt: category.createdAt ?? new Date(),
            updatedAt: category.updatedAt ?? new Date(),
        })
    }
}