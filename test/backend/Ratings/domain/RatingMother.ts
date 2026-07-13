import { Rating } from "@/backend/Ratings/domain/Rating";
import { RatingFactory } from "@/backend/Ratings/domain/RatingFactory";
import { Random } from "../../../helpers/Random";

export interface RatingPrimitives {
    _id: string;
    user: string;
    rate: number;
    isbn: string;
    createdAt: Date;
    updatedAt: Date;
}

export class RatingMother {
    static primitives(overrides: Partial<RatingPrimitives> = {}): RatingPrimitives {
        return {
            _id: Random.objectId(),
            user: Random.objectId(),
            rate: Random.integer(1, 5),
            isbn: Random.isbn13(),
            createdAt: Random.date(),
            updatedAt: Random.date(),
            ...overrides,
        };
    }

    static create(overrides: Partial<RatingPrimitives> = {}): Rating {
        return RatingFactory.create(RatingMother.primitives(overrides));
    }
}
