import { Rating } from "./Rating";
import { BookId } from "@/backend/Books/domain/BookIdVO";
import { RatingId } from "./RatingId";

export interface IRatingRepository {
    create(rating: Rating): Promise<void>;
    findAll(): Promise<Rating[]>;
    findByIsbn(isbn: BookId): Promise<Rating[]>;
    update(ratingId: RatingId, rate: number): Promise<void>;
}