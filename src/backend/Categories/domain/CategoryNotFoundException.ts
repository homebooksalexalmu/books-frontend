import { Exception } from "@/backend/shared/domain/Errors/Exception";

export class CategoryNotFoundException extends Exception {
    constructor(message: string = "Category not found") {
        super(404, "CATEGORY_NOT_FOUND", message);
    }
}