import { RootFilterQuery } from "mongoose";
import { Nullable } from "../../shared/domain/utils";
import { Book } from "./Book";
import { BookId } from "./BookIdVO";
import { BookPortraitVO } from "./BookPortraitVO";

export interface IBookRepository {
    create(bookProps: any): Promise<void>;
    find({
        filter,
        page,
        limit,
        sort
    }: { filter?: RootFilterQuery<Book>; page?: number; limit?: number; sort?: any }): Promise<Book[]>;
    findByIsbn(isbn: BookId): Promise<Nullable<Book>>;
    updateCategories(isbn: BookId, categories: Array<string>): Promise<void>;
    update(isbn: BookId, body: Partial<Book>): Promise<void>;
    updatePortrait(isbn: BookId, portrait: BookPortraitVO): Promise<void>;
}