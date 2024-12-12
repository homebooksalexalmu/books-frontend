import { BookId } from "@/backend/Books/domain/BookIdVO";
import { IRatingRepository } from "@/backend/Ratings/domain/IRatingRepository";
import { Rating } from "@/backend/Ratings/domain/Rating";
import { RatingModel } from "@/backend/shared/infrastructure/MongoDbClient";
import { RatingFactory } from "@/backend/Ratings/domain/RatingFactory";
import { RatingId } from "../../domain/RatingId";

export class IRatingRepositoryImpl implements IRatingRepository {

    constructor() {}
    
    async create(rating: Rating): Promise<void> {
        const ratingPrimitives = rating.toPrimitives();
        const ratingModel = new RatingModel(ratingPrimitives);
        await ratingModel.save();
    }

    async findAll(): Promise<Rating[]> {
        const docs = await RatingModel.find({});
        return docs.map(doc => RatingFactory.create(doc));
    }

    async findByIsbn(isbn: BookId): Promise<Array<Rating>> {
        const docs = await RatingModel.find({isbn: isbn.value});
        return docs.map(doc => Rating.fromPrimitives(doc));
    }

    async update(ratingId: RatingId, rate: number): Promise<void> {
        await RatingModel.updateOne({ _id: ratingId }, { $set: { rate } });
    }
}