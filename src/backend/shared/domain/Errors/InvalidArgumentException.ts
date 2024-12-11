import { Exception } from "./Exception";

export class InvalidArgumentException extends Exception {
    constructor(message: string = "Invalid Argument") {
        super(400, "INVALID_ARGUMENT", message);
    }
}