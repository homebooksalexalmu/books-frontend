import { BookId } from "./BookIdVO";
import { BookPortraitVO } from "./BookPortraitVO";

export class Book {
    _id: BookId;
    title: string;
    description: string;
    portrait: BookPortraitVO;
    publisher: string;
    authors: Array<string>;
    categories: Array<string>;
    pages: number;
    format?: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(props: {
        _id: BookId,
        title: string,
        description: string,
        portrait: BookPortraitVO,
        publisher: string,
        authors: Array<string>,
        categories: Array<string>,
        pages: number,
        format?: string,
        createdAt: Date,
        updatedAt: Date,
    }) {
        this._id = props._id ?? undefined;
        this.title = props.title;
        this.description = props.description;
        this.portrait = props.portrait;
        this.publisher = props.publisher;
        this.authors = props.authors;
        this.categories = props.categories;
        this.pages = props.pages;
        this.format = props.format;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    toPrimitives() {
        return {
            _id: this._id.value,
            title: this.title,
            description: this.description,
            portrait: this.portrait.value,
            publisher: this.publisher,
            authors: this.authors,
            categories: this.categories,
            pages: this.pages,
            format: this.format,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    static fromPrimitives(plainData: {
        _id: string,
        title: string,
        description: string,
        portrait?: string,
        publisher: string,
        authors: Array<string>,
        categories: Array<string>,
        pages: number,
        format?: string,
        createdAt: Date,
        updatedAt: Date,
    }): Book {
        return new Book({
            _id: new BookId(plainData._id),
            title: plainData.title,
            description: plainData.description,
            portrait: new BookPortraitVO(plainData.portrait),
            publisher: plainData.publisher,
            authors: plainData.authors,
            categories: plainData.categories,
            pages: plainData.pages,
            format: plainData.format,
            createdAt: plainData.createdAt,
            updatedAt: plainData.updatedAt,
        });
    }
}