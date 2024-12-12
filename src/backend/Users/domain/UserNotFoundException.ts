import { Exception } from "@/backend/shared/domain/Errors/Exception";

export class UserNotFoundException extends Exception {
    constructor(message: string = "User not found") {
        super(404, "USER_NOT_FOUND", message);
    }
}