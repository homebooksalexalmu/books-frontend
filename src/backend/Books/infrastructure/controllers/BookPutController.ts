import { Exception } from "@/backend/shared/domain/Errors/Exception";
import { NextResponse } from "next/server";
import { BookService } from "../../application/BookService";
import { BookId } from "../../domain/BookIdVO";

export class BookPutController {

    constructor(private readonly updateService: BookService) {}

    async run(isbn: string, body: any) {
        try {
            await this.updateService.update(new BookId(isbn), body);

            return NextResponse.json({}, { status: 200 });
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Exception) {
                return NextResponse.json({ error: error.name, message: error.message }, { status: error.status });
            }
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }
    }

}