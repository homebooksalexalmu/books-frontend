import { Nullable } from "@/backend/shared/domain/utils";
import { Category } from "../domain/Category";
import { ICategoryRepository } from "../domain/ICategoryRepository";

export class CategoryService {

    constructor(private readonly categoryRepository: ICategoryRepository) {}

    async findAll(): Promise<Category[]> {
        return this.categoryRepository.findAll();
    }

    async findByIdOrSlug(term: string): Promise<Nullable<Category>> {
        return this.categoryRepository.findByIdOrSlug(term);
    }

}