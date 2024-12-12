
import { Exception } from "@/backend/shared/domain/Errors/Exception";
import { NextResponse } from "next/server";
import { BookService } from "../../application/BookService";
import { BookId } from "../../domain/BookIdVO";

export class BookFindOneController {

    constructor(private readonly finderService: BookService) { }

    async run(isbn: string) {
        try {
            if (!isbn)
                throw new Exception(400, "ISBN_NOT_PROVIDED", "ISBN is mandatory");

            const book = await this.finderService.findByIsbn(new BookId(isbn));

            return NextResponse.json({ book: book?.toPrimitives() }, { status: 200 })
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Exception) {
                return NextResponse.json({ error: error.name, message: error.message }, { status: error.status });
            }
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }
    }

}