import { Nullable } from "@/backend/shared/domain/utils";
import { Rating } from "./Rating";
import { BookId } from "@/backend/Books/domain/BookIdVO";

export interface IRatingRepository {
    create(rating: Rating): Promise<void>;
    findAll(): Promise<Rating[]>;
    findByIsbn(isbn: BookId): Promise<Nullable<Rating>>;
}