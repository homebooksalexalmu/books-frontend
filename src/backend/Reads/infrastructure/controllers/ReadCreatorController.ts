import { ReadService } from "@/backend/Reads/application/ReadService";
import { Exception } from "@/backend/shared/domain/Errors/Exception";
import { NextRequest, NextResponse } from "next/server";

export class ReadCreatorController {

    constructor(private readonly readCreator: ReadService) {}

    async run(req: NextRequest) {
        try {
            const body = await req.json();

            await this.readCreator.create(body);

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