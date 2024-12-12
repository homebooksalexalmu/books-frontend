import { categoryFinderByTermController } from "@/backend/Categories/infrastructure/dependencies";
import { MongoClientFactory } from "@/backend/shared/infrastructure/MongoDbClient";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: { term: string } }) {
    await MongoClientFactory.createAndConnectClient();
    return categoryFinderByTermController.run(params.term);
}