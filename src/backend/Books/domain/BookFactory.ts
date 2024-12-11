import { DEFAULT_BOOK_PAGES, DEFAULT_COVER_IMAGE } from "@/app/utils";
import { BookProps } from "@/backend/Books/infrastructure/database/Book.schema";

export class BookFactory {
    constructor() { }

    static async create(bookProps: any): Promise<Partial<BookProps>> {
        const imageUrl = DEFAULT_COVER_IMAGE; // await this.cloudinaryService.transformAndUploadAsset(bookProps._id, bookProps.image)
        return {
            _id: bookProps._id,
            title: bookProps.title,
            description: bookProps.description,
            portrait: imageUrl,
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
        }
    }
}