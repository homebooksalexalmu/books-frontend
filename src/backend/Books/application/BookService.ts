import { Nullable } from "@/backend/shared/domain/utils";
import { Book } from "@/backend/Books/domain/Book";
import { BookId } from "@/backend/Books/domain/BookIdVO";
import { IBookRepository } from "@/backend/Books/domain/IBookRepository";
import { BookHamelynFinder } from "./BookHamelynFinder";
import { CloudinaryService } from "@/backend/shared/application/CloudinaryService";
import { BookProps } from "../infrastructure/database/Book.schema";
import { Types } from "mongoose";
import { BookPortraitVO } from "../domain/BookPortraitVO";

export class BookService  {

    constructor(
        private readonly bookRepository: IBookRepository,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    async create(book: Book): Promise<void> {
        await this.bookRepository.create(book);
    }

    async find(): Promise<Book[]> {
        return this.bookRepository.find({});
    }

    async findByIsbn(isbn: BookId): Promise<Nullable<Book>> {
        const result = await this.bookRepository.findByIsbn(isbn);
        if (result) {
            return result;
        }

        const hamelynFinder = new BookHamelynFinder(this.cloudinaryService);
        const book = await hamelynFinder.find(isbn);

        await this.create(book);
        return book;
    }

    async update(isbn: BookId, body: Partial<BookProps>): Promise<void> {
        const authors = body.authors?.map((author: any) => author.value);
        const categories = body.categories?.map((category) => new Types.ObjectId(String(category)));
        const updatedBody = {...body, authors, categories};
        await this.bookRepository.update(isbn, updatedBody);
    }

    async updatePortrait(isbn: BookId, imageUrl: string): Promise<void> {
        const bookPortrait = new BookPortraitVO(imageUrl);
        await this.bookRepository.updatePortrait(isbn, bookPortrait);
    }

}