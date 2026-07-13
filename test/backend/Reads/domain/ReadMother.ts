import { Read } from "@/backend/Reads/domain/Read";
import { ReadUserId } from "@/backend/Reads/domain/ReadUserId";
import { ReadBookStatusVO } from "@/backend/Reads/domain/ReadBookStatus";
import { BookId } from "@/backend/Books/domain/BookIdVO";
import { BookReadsStatus } from "@/app/utils";
import { Random } from "../../../helpers/Random";

export interface ReadOverrides {
    _id?: string;
    user?: string;
    status?: string;
    book?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class ReadMother {
    static create(overrides: ReadOverrides = {}): Read {
        return new Read({
            _id: overrides._id ?? Random.objectId(),
            user: new ReadUserId(overrides.user ?? Random.objectId()),
            status: new ReadBookStatusVO(overrides.status ?? Random.element(Object.values(BookReadsStatus))),
            book: new BookId(overrides.book ?? Random.isbn13()),
            createdAt: overrides.createdAt ?? Random.date(),
            updatedAt: overrides.updatedAt ?? Random.date(),
        });
    }
}
