import { bookAuthorsController } from "@/backend/Books/infrastructure/dependencies";
import { MongoClientFactory } from "@/backend/shared/infrastructure/MongoDbClient";

export async function GET() {
    await MongoClientFactory.createAndConnectClient();
    return await bookAuthorsController.run();
}