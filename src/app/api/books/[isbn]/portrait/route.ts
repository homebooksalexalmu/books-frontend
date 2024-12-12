import { bookPutPortraitController } from "@/backend/Books/infrastructure/dependencies";
import { MongoClientFactory } from "@/backend/shared/infrastructure/MongoDbClient";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { isbn: string } }) {
    await MongoClientFactory.createAndConnectClient();
    return await bookPutPortraitController.run(req, params.isbn);
}