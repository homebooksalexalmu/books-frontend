import { BookId } from "@/backend/Books/domain/BookIdVO";
import { readFinderByIsbnController, readPutController } from "@/backend/Reads/infrastructure/dependencies";
import { MongoClientFactory } from "@/backend/shared/infrastructure/MongoDbClient";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: { isbn: string } }) {
    await MongoClientFactory.createAndConnectClient();
    return readFinderByIsbnController.run(new BookId(params.isbn));
}

export async function PUT(req: NextRequest, { params }: { params: { isbn: string } }) {
    await MongoClientFactory.createAndConnectClient();
    return readPutController.run(req, params.isbn);
}