import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

/**
 * Spins up an ephemeral in-memory MongoDB and connects the shared mongoose
 * instance to it. The repository implementations use the model singletons from
 * MongoDbClient, which bind to this default connection — so connecting here is
 * enough for them to work against the in-memory database.
 *
 * Usage inside an integration test file:
 *
 *   const mongo = useInMemoryMongo();  // registers beforeAll/afterAll/afterEach
 */
export const useInMemoryMongo = () => {
    let mongod: MongoMemoryServer;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        await mongoose.connect(mongod.getUri());
    }, 120_000);

    afterEach(async () => {
        const collections = mongoose.connection.collections;
        await Promise.all(Object.values(collections).map((collection) => collection.deleteMany({})));
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongod?.stop();
    });
};
