import { Exception } from "@/backend/shared/domain/Errors/Exception";

export class UserAlreadyExistsException extends Exception {
    constructor(message: string = "User already exists") {
        super(400, "USER_ALREADY_EXISTS", message);
    }
}