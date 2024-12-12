import mongoose, { ConnectOptions } from "mongoose";
import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";
import { bookSchema } from "@/backend/Books/infrastructure/database/Book.schema";
import { categorySchema } from "@/backend/Categories/infrastructure/database/Category.schema";
import { readSchema } from "@/backend/Reads/infrastructure/database/Read.schema";
import { userSchema } from "@/backend/Users/infrastructure/database/User.schema";
import { ratingSchema } from "@/backend/Ratings/infrastructure/database/Rating.schema";

export class MongoClientFactory {

    static async createAndConnectClient(): Promise<void> {
        try {
            const mongoUrl: string | undefined = process.env.MONGODB_URI;

            if (!mongoUrl) {
                throw new InvalidArgumentException("MONGO_URL is not defined");
            }

            await mongoose.connect(mongoUrl, {} as ConnectOptions);

            console.log("🎉 Connected to MongoDB Database 🎉");
        } catch (error: unknown) {
            console.error("❌ Database initialization failed: ", error);
            process.exit(0);
        }
    }
}

export const UserModel = mongoose.models.UserModel ?? mongoose.model("UserModel", userSchema, "users");
export const BookModel = mongoose.models.BookModel ?? mongoose.model("BookModel", bookSchema, "books");
export const CategoryModel = mongoose.models.CategoryModel ?? mongoose.model("CategoryModel", categorySchema, "categories");
export const ReadModel = mongoose.models.ReadModel ?? mongoose.model("ReadModel", readSchema, "reads");
export const RatingModel = mongoose.models.RatingModel ?? mongoose.model("RatingModel", ratingSchema, "ratings");