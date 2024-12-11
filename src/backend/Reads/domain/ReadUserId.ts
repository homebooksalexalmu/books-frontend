import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";
import { ValueObject } from "@/backend/shared/domain/value-object/ValueObject";
import { isValidObjectId } from "mongoose";

export class ReadUserId extends ValueObject<string> {
    readUserId: string;

    constructor(_readUserId: string) {
        super(_readUserId);
        this.ensureReadUserIdIsValidObjectId(_readUserId);
        this.readUserId = _readUserId;
    }
    
    private ensureReadUserIdIsValidObjectId = (userId: string) => {
        if (!isValidObjectId(userId)) {
            throw new InvalidArgumentException(`Invalid Argument: ReadUserId is not a valid ObjectId ${userId}`);
        }
    }

}