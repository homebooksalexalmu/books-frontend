import { RatingFinderService } from "@/backend/Ratings/application/RatingFinder";
import { Exception } from "@/backend/shared/domain/Errors/Exception";
import { NextResponse } from "next/server";
import { RatingNotFoundException } from "../../domain/RatingNotFoundException";

export class RatingFinderController {

    constructor(private readonly ratingFinder: RatingFinderService) { }

    async run() {
        try {
            const ratings = await this.ratingFinder.findAll();

            return NextResponse.json({ ratings }, { status: 200 });
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Exception) {
                return NextResponse.json({ error: error.name, message: error.message }, { status: error.status });
            }
            return NextResponse.json({ error: error }, { status: 500 });
        }
    }
}

export class RatingFinderByIsbnController {

    constructor(private readonly ratingFinder: RatingFinderService) { }

    async run(isbn: string) {
        try {
            const rating = await this.ratingFinder.findByIsbn(isbn);

            if (!rating) {
                throw new RatingNotFoundException(`Rating with ISBN <${isbn}> not found.`)
            }

            return NextResponse.json({ rating }, { status: 200 });
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Exception) {
                return NextResponse.json({ error: error.name, message: error.message }, { status: error.status });
            }
            return NextResponse.json({ error: error }, { status: 500 });
        }
    }
}