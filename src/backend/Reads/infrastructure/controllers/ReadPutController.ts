import { NextRequest, NextResponse } from "next/server";
import { ReadService } from "@/backend/Reads/application/ReadService";
import { BookId } from "@/backend/Books/domain/BookIdVO";
import { Exception } from "@/backend/shared/domain/Errors/Exception";
import { ReadBookStatusVO } from "@/backend/Reads/domain/ReadBookStatus";

export class ReadPutController {

    constructor(private readonly readUpdater: ReadService) { }

    async run(req: NextRequest, isbn: string) {
        try {
            const body = await req.json();

            const bookId = new BookId(isbn);
            const readStatus = new ReadBookStatusVO(body.status);

            await this.readUpdater.update(bookId, readStatus);

            return NextResponse.json({}, { status: 200 })
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Exception) {
                return NextResponse.json({ error: error.name, message: error.message }, { status: error.status });
            }
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }
    }

}