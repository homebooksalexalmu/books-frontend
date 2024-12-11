import { Exception } from "./Exception";

export class Cloudinaryxception extends Exception {
    constructor(message: string = "Error uploading or transform uploaded image.") {
        super(400, "CLOUDINARY_SERVICE_ERROR", message);
    }
}