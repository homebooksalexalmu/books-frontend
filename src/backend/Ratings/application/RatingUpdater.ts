import { IRatingRepository } from "../domain/IRatingRepository";
import { RatingId } from "../domain/RatingId";

export class RatingUpdaterService {

    constructor(private readonly ratingRepository: IRatingRepository) {}

    async updateRate(ratingId: RatingId, rate: number) {
        await this.ratingRepository.update(ratingId, rate);
    }

}