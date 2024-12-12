import { DEFAULT_BOOK_PAGES } from "@/app/utils";
import { Book } from "./Book";
import { BookId } from "./BookIdVO";
import { BookPortraitVO } from "./BookPortraitVO";

export class BookFactory {
    constructor() { }

    static async create(bookProps: any, image: string): Promise<Book> {
        return new Book({
            _id: new BookId(bookProps._id),
            title: bookProps.title,
            description: bookProps.description,
            portrait: new BookPortraitVO(image),
            authors: bookProps.attributes.authors.map((author: string) =>
                author.includes(",")
                    ? author.split(",").reverse().join(" ").trim()
                    : author),
            pages: bookProps.attributes.pages ?? DEFAULT_BOOK_PAGES,
            categories: [],
            publisher: bookProps.attributes.publisher,
            format: bookProps.attributes.format,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }
}