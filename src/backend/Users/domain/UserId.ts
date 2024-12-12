import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";
import { ValueObject } from "@/backend/shared/domain/value-object/ValueObject";
import { isValidObjectId } from "mongoose";


export class UserId extends ValueObject<string> {
    userId: string;

    constructor(_userId: string) {
        super(_userId);
        this.ensureCategoryIdIsValidObjectId(_userId);
        this.userId = _userId;
    }
    
    private ensureCategoryIdIsValidObjectId = (userId: string) => {
        if (!isValidObjectId(userId)) {
            throw new InvalidArgumentException(`Invalid Argument: UserId is not a valid ObjectId ${userId}`);
        }
    }
}