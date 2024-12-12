import { Exception } from "./Exception";

export class UploadedFileNotFoundException extends Exception {
    constructor(message: string = "Not file on requests") {
        super(400, "UPLOADED_FILE_NOT_FOUND_EXCEPTION", message);
    }
}