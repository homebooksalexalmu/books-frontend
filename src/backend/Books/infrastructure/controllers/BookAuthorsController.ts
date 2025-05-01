import { Exception } from "@/backend/shared/domain/Errors/Exception";
import { NextResponse } from "next/server";
import { ReadService } from "@/backend/Reads/application/ReadService";

export class BookAuthorsController {

    constructor(private readonly readService: ReadService) {}

    async run() {
        try {
            const authors = await this.readService.findAllAuthors();

            return NextResponse.json({ authors }, { status: 200 })
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Exception) {
                return NextResponse.json({ error: error.name, message: error.message }, { status: error.status });
            }
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }
    }

}