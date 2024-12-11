import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { bookFindOneController } from "@/backend/Books/infrastructure/dependencies";
import { MongoClientFactory } from "@/backend/shared/infrastructure/MongoDbClient";

export async function PUT(req: NextRequest, { params }: { params: { isbn: string } }) {
    try {
        const body = await req.json();
        const { isbn } = params;

        await axios.patch(`https://books-back-alpha.vercel.app/api/books/${isbn}`, body);
        return NextResponse.json({ message: "Updated" });
    } catch (error: unknown) {
        console.log(error)
        return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 })
    }
}

export async function GET(req: NextRequest, { params }: { params: { isbn: string } }) {
    await MongoClientFactory.createAndConnectClient();
    return await bookFindOneController.run(params.isbn);
}
