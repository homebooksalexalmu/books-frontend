import { NextRequest, NextResponse } from "next/server";
import { RatingCreatorService } from "@/backend/Ratings/application/RatingCreator";
import { Exception } from "@/backend/shared/domain/Errors/Exception";

export class RatingCreatorController {

    constructor(private readonly ratingCreator: RatingCreatorService) { }

    async run(req: NextRequest) {
        try {
            const body = await req.json();
            
            await this.ratingCreator.create(body);

            return NextResponse.json({ message: "Created!" }, { status: 201 });
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Exception) {
                return NextResponse.json({ error: error.name, message: error.message }, { status: error.status });
            }
            return NextResponse.json({ error: error }, { status: 500 });
        }
    }

}