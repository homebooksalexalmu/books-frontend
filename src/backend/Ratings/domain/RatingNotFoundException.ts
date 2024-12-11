import { Exception } from "@/backend/shared/domain/Errors/Exception";

export class RatingNotFoundException extends Exception {
    constructor(message: string = "Rating not found") {
        super(404, "RATING_NOT_FOUND", message);
    }
}