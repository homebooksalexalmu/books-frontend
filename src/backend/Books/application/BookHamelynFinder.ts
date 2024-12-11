import { BookId } from "@/backend/Books/domain/BookIdVO";
import { Exception } from "@/backend/shared/domain/Errors/Exception";
import axios from "axios";
import { BookFactory } from "../domain/BookFactory";

export class BookHamelynFinder {

    constructor() {}

    async find(isbn: BookId): Promise<any> {
        try {
            console.log("Calling to hamelyn")
            const response = await axios.get(`https://serverless.hamelyn.com/api/v4/product/${isbn}`);
            console.log(response)
            const result = response.data.productResult ? response.data.productResult : response.data;
            return BookFactory.create(result);
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