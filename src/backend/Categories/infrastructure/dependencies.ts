import { CategoryService } from "../application/CategoryService";
import { CategoryFinderByIdOrSlugController, CategoryFinderController } from "./controllers/CategoryFinderController";
import { ICategoryRepositoryImpl } from "./repository/ICategoryRepositoryImpl";

const categoryRepository = new ICategoryRepositoryImpl();
const categoryService = new CategoryService(categoryRepository);

export const categoryFinderController = new CategoryFinderController(categoryService);
export const categoryFinderByTermController = new CategoryFinderByIdOrSlugController(categoryService);