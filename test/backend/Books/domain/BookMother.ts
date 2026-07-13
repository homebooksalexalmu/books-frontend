import { Book } from "@/backend/Books/domain/Book";
import { Random } from "../../../helpers/Random";

export interface BookPrimitives {
    _id: string;
    title: string;
    description: string;
    portrait?: string;
    publisher: string;
    authors: string[];
    categories: string[];
    pages: number;
    format?: string;
    createdAt: Date;
    updatedAt: Date;
}

export class BookMother {
    static primitives(overrides: Partial<BookPrimitives> = {}): BookPrimitives {
        return {
            _id: Random.isbn13(),
            title: Random.word("Title"),
            description: Random.word("Description"),
            portrait: Random.url(),
            publisher: Random.word("Publisher"),
            authors: Random.words(2, "Author"),
            categories: [Random.objectId()],
            pages: Random.integer(50, 900),
            format: "Tapa blanda",
            createdAt: Random.date(),
            updatedAt: Random.date(),
            ...overrides,
        };
    }

    static create(overrides: Partial<BookPrimitives> = {}): Book {
        return Book.fromPrimitives(BookMother.primitives(overrides));
    }
}
