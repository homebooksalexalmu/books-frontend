import { Types } from "mongoose";
import { IUserRepository } from "@/backend/Users/domain/IUserRepository";
import { UserNotFoundException } from "@/backend/Users/domain/UserNotFoundException";
import { IReadRepository } from "@/backend/Reads/domain/IReadRepository";
import { Exception } from "@/backend/shared/domain/Errors/Exception";
import { Read } from "@/backend/Reads/domain/Read";
import { ReadModel } from "@/backend/shared/infrastructure/MongoDbClient";
import { BookId } from "@/backend/Books/domain/BookIdVO";
import { ReadBookStatusVO } from "@/backend/Reads/domain/ReadBookStatus";

export class ReadService {

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly readRepository: IReadRepository
  ) { }

  async create(body: any) {
    const userId = body.user;

    const user = await this.userRepository.findOneByAuth0Id(userId);

    if (!user) {
      throw new UserNotFoundException(`User not found with id <${userId}>`);
    }

    const formattedDTO = {
      ...body,
      user: new Types.ObjectId(String(user._id))
    }

    if (await this.readRepository.findOneByUserAndBook(formattedDTO.user, formattedDTO.book)) {
      throw new Exception(409, "RESOURCE_ALREADY_EXISTS", "This read already exists");
    }

    const read = Read.fromPrimitives(formattedDTO);
    await this.readRepository.save(read);
  }

  async findAll(criteria: any) {
    const user = criteria.reader ? await this.userRepository.findOneByAuth0Id(criteria.reader) : undefined;
    const criteriaMatch = {
      ...(criteria.status && criteria.status.length ? { status: criteria.status } : undefined),
      ...(user ? { user: user._id?.value } : undefined)
    };
    return ReadModel.aggregate([
      {
        $match: criteriaMatch
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
      ...(criteria.categories && criteria.categories !== ""
        ? [
          {
            $match: {
              "bookInfo.categories": { $in: [new Types.ObjectId(String(criteria.categories))] }
            }
          }
        ]
        : []),
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
        $project: {
          bookInfo: 0,
          categoryDetails: 0,
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
            picture: "$userDetails.picture"
          }
        }
      },
      {
        $lookup: {
          from: "ratings",
          localField: "isbn",
          foreignField: "isbn",
          as: "ratings"
        }
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: "$ratings" }, 0] },
              then: { $avg: "$ratings.rate" },
              else: null
            }
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
      },
      {
        $sort: {
          createdAt: -1
        }
      }
    ]);
  }

  async findOneByIsbn(isbn: string) {
    return this.readRepository.findOneByIsbn(new BookId(isbn))
  }

  async update(isbn: BookId, status: ReadBookStatusVO): Promise<void> {
    return this.readRepository.update(isbn, status);
  }
}