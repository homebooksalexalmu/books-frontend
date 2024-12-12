import { Types } from "mongoose";
import { Read } from "./Read";
import { Nullable } from "@/backend/shared/domain/utils";
import { BookId } from "@/backend/Books/domain/BookIdVO";

export interface IReadRepository {
    save(read: Read): Promise<void>;
    find(fitlers: any): Promise<Read[]>;
    findOneByUserAndBook(user: string | Types.ObjectId, isbn: BookId): Promise<Nullable<Read>>
    findOneByIsbn(isbn: BookId): Promise<Nullable<Read>>
}