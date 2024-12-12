import { Exception } from "@/backend/shared/domain/Errors/Exception";
import { NextRequest, NextResponse } from "next/server";
import { BookService } from "../../application/BookService";

export class BookCreatorController {

    constructor(private readonly creatorService: BookService) {}

    async run(req: NextRequest) {
        try {
            const body = await req.json();

            await this.creatorService.create(body);

            return NextResponse.json({}, { status: 201 })
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Exception) {
                return NextResponse.json({ error: error.name, message: error.message }, { status: error.status });
            }
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }
    }

}