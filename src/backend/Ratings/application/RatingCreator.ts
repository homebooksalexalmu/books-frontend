import { IRatingRepository } from "../domain/IRatingRepository";
import { RatingFactory } from "../domain/RatingFactory";

export class RatingCreatorService {

    constructor(private readonly ratingRepository: IRatingRepository) {}

    async create(body: any) {
        const rating = RatingFactory.create(body);
        await this.ratingRepository.create(rating);
    }

}