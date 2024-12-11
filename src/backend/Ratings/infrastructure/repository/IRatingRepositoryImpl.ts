import { BookId } from "@/backend/Books/domain/BookIdVO";
import { Nullable } from "@/backend/shared/domain/utils";
import { IRatingRepository } from "@/backend/Ratings/domain/IRatingRepository";
import { Rating } from "@/backend/Ratings/domain/Rating";
import { RatingModel } from "@/backend/shared/infrastructure/MongoDbClient";
import { RatingFactory } from "@/backend/Ratings/domain/RatingFactory";

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

    async findByIsbn(isbn: BookId): Promise<Nullable<Rating>> {
        const doc = await RatingModel.findOne({_id: isbn.value});
        return RatingFactory.create(doc);
    }

}