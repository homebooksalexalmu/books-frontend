import { BookId } from "@/backend/Books/domain/BookIdVO";
import { RatingRate } from "./RatingRateVO";
import { UserId } from "@/backend/Users/domain/UserId";
import { RatingId } from "./RatingId";

export class Rating {
    _id: RatingId;
    user: UserId;
    rate: RatingRate;
    isbn: BookId;
    createdAt: Date;
    updatedAt: Date;

    constructor(props: {
        _id: RatingId;
        user: UserId;
        rate: RatingRate;
        isbn: BookId;
        createdAt: Date;
        updatedAt: Date;
    }) {
        this._id = props._id;
        this.user = props.user;
        this.rate = props.rate;
        this.isbn = props.isbn;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    toPrimitives() {
        return {
            _id: this._id.value,
            user: this.user.value,
            rate: this.rate.value,
            isbn: this.isbn.value,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    static fromPrimitives(plainData: {
        _id: RatingId;
        user: UserId;
        rate: RatingRate;
        isbn: BookId;
        createdAt: Date;
        updatedAt: Date;
    }): Rating {
        return new Rating({
            _id: plainData._id,
            user: plainData.user,
            rate: plainData.rate,
            isbn: plainData.isbn,
            createdAt: plainData.createdAt,
            updatedAt: plainData.updatedAt,
        });
    }

}