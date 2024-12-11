import axios from "axios";
import { BookId } from "@/backend/Books/domain/BookIdVO";
import { Exception } from "@/backend/shared/domain/Errors/Exception";
import { BookFactory } from "@/backend/Books/domain/BookFactory";
import { Book } from "@/backend/Books/domain/Book";
import { CloudinaryService } from "@/backend/shared/application/CloudinaryService";

export class BookHamelynFinder {

    constructor(private readonly cloudinaryService: CloudinaryService) {}

    async find(isbn: BookId): Promise<Book> {
        try {
            console.log("Calling to hamelyn")
            const response = await axios.get(`https://serverless.hamelyn.com/api/v4/product/${isbn}`);
            const result = response.data.productResult ? response.data.productResult : response.data;
            const imageUrl = await this.cloudinaryService.transformAndUploadAsset(result._id, result.image);
            return BookFactory.create(result, imageUrl);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.message);
                if (error.response) {
                    console.error("Error:", error.response.data);
                }
            } else if (error instanceof Exception) {
                console.log(`Error: ${error.message} with status: ${error.status}`);
                throw error;
            } else {
                console.error("Unknown Error:", error);
            }
            throw new Exception(500, "ERROR_HAMELYN_PROVIDER", "Error getting book info from Hamelyn");
        }
    }
}