import { Nullable } from "@/backend/shared/domain/utils";
import { Book } from "@/backend/Books/domain/Book";
import { BookId } from "@/backend/Books/domain/BookIdVO";
import { IBookRepository } from "@/backend/Books/domain/IBookRepository";
import { BookHamelynFinder } from "./BookHamelynFinder";

export class BookService  {

    constructor(private readonly bookRepository: IBookRepository) { }

    async create(bookProps: any): Promise<void> {
        const book = Book.fromPrimitives(bookProps);
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

        const hamelynFinder = new BookHamelynFinder();
        const book = await hamelynFinder.find(isbn);

        await this.create(book);
        return Book.fromPrimitives(book);
    }

}