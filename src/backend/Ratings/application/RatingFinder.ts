import { BookId } from "@/backend/Books/domain/BookIdVO";
import { IRatingRepository } from "../domain/IRatingRepository";

export class RatingFinderService {

    constructor(private readonly ratingRepository: IRatingRepository) {}

    async findAll() {
        return await this.ratingRepository.findAll();
    }

    async findByIsbn(isbn: string) {
        return await this.ratingRepository.findByIsbn(new BookId(isbn));
    }

}