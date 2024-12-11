import { RootFilterQuery } from "mongoose";
import { IBookRepository } from "@/backend/Books/domain/IBookRepository";
import { Book } from "@/backend/Books/domain/Book";
import { BookId } from "@/backend/Books/domain/BookIdVO";
import { BookPortraitVO } from "@/backend/Books/domain/BookPortraitVO";
import { Nullable } from "@/backend/shared/domain/utils";
import { BookModel } from "@/backend/shared/infrastructure/MongoDbClient";

export class IBookRepositoryImpl implements IBookRepository {

    async create(book: Book): Promise<void> {
        const newBookModel = new BookModel(book.toPrimitives());
        await newBookModel.save();
    }

    async find({
        filter = {},
        page = 1,
        limit = 10,
        sort = { createdAt: -1 }
    }: { filter?: RootFilterQuery<Book>; page?: number; limit?: number; sort?: any }): Promise<Book[]> {
        const skip = (page - 1) * limit;
        const results = await BookModel.find(filter)
            // .populate("categories")
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec();
        return results.map(book => Book.fromPrimitives(book));
    }

    async findByIsbn(isbn: BookId): Promise<Nullable<Book>> {
        const bookProps = await BookModel.findOne({ _id: isbn.value })//.populate("categories");

        if (!bookProps) return undefined;
        return Book.fromPrimitives(bookProps);
    }

    async updateCategories(isbn: BookId, categoryIds: Array<string>): Promise<void> {
        await BookModel.updateOne({ _id: isbn.value }, { $set: { categories: categoryIds } });
    }

    async update(isbn: BookId, body: Partial<Book>): Promise<void> {
        await BookModel.updateOne({ _id: isbn.value }, { $set: { ...body } });
    }

    async updatePortrait(isbn: BookId, portrait: BookPortraitVO) {
        await BookModel.updateOne({ _id: isbn.value }, { $set: { portrait: portrait.value } });
    }
}