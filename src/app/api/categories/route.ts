import { categoryFinderController } from "@/backend/Categories/infrastructure/dependencies";
import { MongoClientFactory } from "@/backend/shared/infrastructure/MongoDbClient";

export async function GET() {
    await MongoClientFactory.createAndConnectClient();
    return await categoryFinderController.run();
}