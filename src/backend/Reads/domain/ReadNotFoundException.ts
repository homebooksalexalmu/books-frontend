import { Exception } from "@/backend/shared/domain/Errors/Exception";

export class ReadNotFoundException extends Exception {
    constructor(message: string = "Read not found") {
        super(404, "READ_NOT_FOUND", message);
    }
}