import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";
import { ValueObject } from "@/backend/shared/domain/value-object/ValueObject";
import { isValidObjectId } from "mongoose";

export class RatingId extends ValueObject<string> {
    ratingId: string;

    constructor(_ratingId: string) {
        console.log({hola: _ratingId})
        super(_ratingId);
        this.ensureRatingIdIsValidObjectId(_ratingId);
        this.ratingId = _ratingId;
    }
    
    private ensureRatingIdIsValidObjectId = (userId: string) => {
        if (!isValidObjectId(userId)) {
            console.log("ERROR!")
            console.log(userId)
            throw new InvalidArgumentException(`Invalid Argument: RatingId is not a valid ObjectId ${userId}`);
        }
    }

}