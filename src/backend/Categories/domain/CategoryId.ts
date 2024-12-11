import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";
import { ValueObject } from "@/backend/shared/domain/value-object/ValueObject";
import { isValidObjectId } from "mongoose";

export class CategoryId extends ValueObject<string> {
    categoryId: string;

    constructor(_categoryId: string) {
        super(_categoryId);
        this.ensureCategoryIdIsValidObjectId(_categoryId);
        this.categoryId = _categoryId;
    }
    
    private ensureCategoryIdIsValidObjectId = (userId: string) => {
        if (!isValidObjectId(userId)) {
            throw new InvalidArgumentException(`Invalid Argument: CategoryId is not a valid ObjectId ${userId}`);
        }
    }

}