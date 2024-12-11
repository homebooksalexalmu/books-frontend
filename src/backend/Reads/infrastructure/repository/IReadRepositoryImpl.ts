import { IReadRepository } from "@/backend/Reads/domain/IReadRepository";
import { Read } from "../../domain/Read";
import { Types } from "mongoose";
import { ReadModel } from "@/backend/shared/infrastructure/MongoDbClient";
import { Nullable } from "@/backend/shared/domain/utils";
import { BookId } from "@/backend/Books/domain/BookIdVO";

export class IReadRepositoryImpl implements IReadRepository {

    constructor() { }

    async save(read: Read): Promise<void> {
        const newRead = new ReadModel(read.toPrimitives());
        await newRead.save();
    }

    async find(filters: any): Promise<Read[]> {
        const results = await ReadModel.find(filters);
        return results.map(result => Read.fromPrimitives(result));
    }

    async findOneByUserAndBook(user: string | Types.ObjectId, isbn: BookId): Promise<Nullable<Read>> {
        const result = await ReadModel.findOne({ book: isbn.value, user });

        if (!result) return undefined;

        return Read.fromPrimitives(result);
    }

    async findOneByIsbn(isbn: BookId): Promise<Nullable<any>> {
        return await ReadModel.aggregate([
            {
                $match: { book: isbn.value }
            },
            {
                $group: {
                    _id: "$book",
                    userReads: {
                        $push: {
                            _id: "$_id",
                            user: "$user",
                            status: "$status",
                            createdAt: "$createdAt",
                            updatedAt: "$updatedAt"
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo"
                }
            },
            {
                $unwind: {
                    path: "$bookInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    isbn: "$_id",
                    title: "$bookInfo.title",
                    description: "$bookInfo.description",
                    portrait: "$bookInfo.portrait",
                    publisher: "$bookInfo.publisher",
                    authors: "$bookInfo.authors",
                    categories: "$bookInfo.categories",
                    pages: "$bookInfo.pages",
                    createdAt: "$bookInfo.createdAt",
                    updatedAt: "$bookInfo.updatedAt"
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categories",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            {
                $addFields: {
                    categories: {
                        $map: {
                            input: "$categoryDetails",
                            as: "category",
                            in: {
                                _id: "$$category._id",
                                name: "$$category.name"
                            }
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "ratings",
                    localField: "isbn",
                    foreignField: "isbn",
                    as: "ratingsInfo"
                }
            },
            {
                $addFields: {
                    averageRating: {
                        $cond: {
                            if: { $gt: [{ $size: "$ratingsInfo" }, 0] },
                            then: { $avg: "$ratingsInfo.rate" },
                            else: null
                        }
                    }
                }
            },
            {
                $project: {
                    bookInfo: 0,
                    categoryDetails: 0,
                    ratingsInfo: 0,
                    _id: 0
                }
            },
            {
                $unwind: "$userReads"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userReads.user",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: {
                    path: "$userDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    "userReads.user": {
                        _id: "$userDetails._id",
                        name: "$userDetails.name",
                        picture: "$userDetails.picture",
                        sub: "$userDetails.auth0Id"
                    }
                }
            },
            {
                $group: {
                    _id: "$isbn",
                    isbn: { "$first": "$isbn" },
                    title: { "$first": "$title" },
                    description: { "$first": "$description" },
                    portrait: { "$first": "$portrait" },
                    publisher: { "$first": "$publisher" },
                    authors: { "$first": "$authors" },
                    categories: { "$first": "$categories" },
                    pages: { "$first": "$pages" },
                    createdAt: { "$first": "$createdAt" },
                    updatedAt: { "$first": "$updatedAt" },
                    averageRating: { "$first": "$averageRating" },
                    userReads: { "$push": "$userReads" }
                }
            }
        ]);
    }

}