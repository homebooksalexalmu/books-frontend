import { RatingProps } from "@/backend/Ratings/infrastructure/database/Rating.schema";
import { Rating } from "./Rating";
import { RatingId } from "./RatingId";
import { BookId } from "@/backend/Books/domain/BookIdVO";
import { RatingRate } from "./RatingRateVO";
import { UserId } from "@/backend/Users/domain/UserId";

export class RatingFactory {
    static create(props: RatingProps) {
        return new Rating({
            _id: new RatingId(props._id),
            isbn: new BookId(props.isbn),
            rate: new RatingRate(props.rate),
            user: new UserId(props.user),
            createdAt: props.createdAt,
            updatedAt: props.updatedAt,
        });
    }
}