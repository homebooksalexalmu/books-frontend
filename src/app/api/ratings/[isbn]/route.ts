import { NextRequest } from "next/server";
import { MongoClientFactory } from "@/backend/shared/infrastructure/MongoDbClient";
import { ratingPutController } from "@/backend/Ratings/infrastructure/dependencies";

export async function PUT(req: NextRequest, { params }: { params: { isbn: string } }) {
    await MongoClientFactory.createAndConnectClient();
    return await ratingPutController.run(req, params.isbn);
}