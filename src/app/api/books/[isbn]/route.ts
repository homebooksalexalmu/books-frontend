import { NextRequest, NextResponse } from "next/server";
import { bookFindOneController, bookPutController } from "@/backend/Books/infrastructure/dependencies";
import { MongoClientFactory } from "@/backend/shared/infrastructure/MongoDbClient";

export async function PUT(req: NextRequest, { params }: { params: { isbn: string } }) {
    try {
        const body = await req.json();
        const { isbn } = params;
        await MongoClientFactory.createAndConnectClient();
        return await bookPutController.run(isbn, body.newBook);
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }
}

export async function GET(req: NextRequest, { params }: { params: { isbn: string } }) {
    await MongoClientFactory.createAndConnectClient();
    return await bookFindOneController.run(params.isbn);
}
