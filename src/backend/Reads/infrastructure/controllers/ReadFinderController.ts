import { NextRequest, NextResponse } from "next/server";
import { ReadService } from "@/backend/Reads/application/ReadService";
import { Exception } from "@/backend/shared/domain/Errors/Exception";
import { BookId } from "@/backend/Books/domain/BookIdVO";
import { ReadNotFoundException } from "@/backend/Reads/domain/ReadNotFoundException";

export class ReadFinderController {

    constructor(private readonly readCreator: ReadService) {}

    async run(req: NextRequest) {
        try {
            const searchParams = req.nextUrl.searchParams;
            const query = {
                reader: searchParams.get("reader"),
                status: searchParams.get("status"),
                categories: searchParams.get("categories"),
            };
            const results = await this.readCreator.findAll(query);

            return NextResponse.json({ reads: results }, { status: 200 })
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Exception) {
                return NextResponse.json({ error: error.name, message: error.message }, { status: error.status });
            }
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }
    }
}

export class ReadFinderByIsbnController {

    constructor(private readonly readCreator: ReadService) {}

    async run(isbn: BookId) {
        try {
            const result = await this.readCreator.findOneByIsbn(isbn.value);

            if (!result) {
                throw new ReadNotFoundException(`Read with isbn <${isbn}> not found`);
            }

            return NextResponse.json({ book: result }, { status: 200 });
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Exception) {
                return NextResponse.json({ error: error.name, message: error.message }, { status: error.status });
            }
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }
    }
}