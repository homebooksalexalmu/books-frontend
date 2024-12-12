import { Criteria } from "@/backend/shared/domain/criteria/Criteria";
import { Category } from "./Category";
import { Nullable } from "@/backend/shared/domain/utils";

export interface ICategoryRepository {
    save(category: Category): Promise<void>;
    findAll(): Promise<Category[]>;
    findByIdOrSlug(term: string): Promise<Nullable<Category>>;
    search(criteria: Criteria): Promise<Category[]>;
}