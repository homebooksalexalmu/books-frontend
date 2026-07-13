import { ICategoryRepository } from "@/backend/Categories/domain/ICategoryRepository";
import { Criteria } from "@/backend/shared/domain/criteria/Criteria";
import { Nullable } from "@/backend/shared/domain/utils";
import { Category } from "@/backend/Categories/domain/Category";
import { CategoryModel } from "@/backend/shared/infrastructure/MongoDbClient";
import { CategoryFactory } from "@/backend/Categories/domain/CategoryFactory";
import { MongoCriteriaConverter } from "@/backend/shared/infrastructure/MongoCriteriaConverter";
import { isValidObjectId } from "mongoose";

export class ICategoryRepositoryImpl implements ICategoryRepository {

    private readonly criteriaConverter = new MongoCriteriaConverter();

    async save(category: Category): Promise<void> {
        const categoryPrimitives = category.toPrimitives();
        const categoryModel = new CategoryModel(categoryPrimitives);
        await categoryModel.save();
    }

    async findAll(): Promise<Category[]> {
        const categories = await CategoryModel.find({});
        return categories.map(category => CategoryFactory.create(category));
    }

    async findByIdOrSlug(term: string): Promise<Nullable<Category>> {
        const filter = isValidObjectId(term) ? { _id: term } : { slug: term };
        const categoryProps = await CategoryModel.findOne(filter);
        return CategoryFactory.create(categoryProps);
    }

    async search(criteria: Criteria): Promise<Category[]> {
        const query = this.criteriaConverter.convert(criteria);
        const categories = await CategoryModel.find(query.filter)
            .sort(query.sort)
            .skip(query.skip)
            .limit(query.limit);
        return categories.map(category => CategoryFactory.create(category));
    }

}