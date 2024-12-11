
import { ReadBookStatusVO } from "./ReadBookStatus";
import { ReadUserId } from "./ReadUserId";
import { BookId } from "@/backend/Books/domain/BookIdVO";

export class Read {
    _id?: string;
    user: ReadUserId;
    status: ReadBookStatusVO;
    book: BookId;
    createdAt: Date;
    updatedAt: Date;

    constructor(props: {
        _id?: string;
        user: ReadUserId;
        status: ReadBookStatusVO;
        book: BookId;
        createdAt: Date;
        updatedAt: Date;
    }) {
        this._id = props._id;
        this.user = props.user;
        this.status = props.status;
        this.book = props.book;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    toPrimitives() {
        return {
            _id: this._id,
            user: this.user,
            status: this.status,
            book: this.book,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    static fromPrimitives(plainData: {
        _id: string;
        user: ReadUserId;
        status: ReadBookStatusVO;
        book: BookId;
        createdAt: Date;
        updatedAt: Date;
    }): Read {
        return new Read({
            _id: plainData._id,
            user: plainData.user,
            status: plainData.status,
            book: plainData.book,
            createdAt: plainData.createdAt,
            updatedAt: plainData.updatedAt,
        });
    }
}
