import { DEFAULT_COVER_IMAGE } from '@/app/utils';
import axios from 'axios';
import { v2 as cloudinary } from "cloudinary";
import { Cloudinaryxception } from '@/backend/shared/domain/Errors/CloudinaryException';

export class CloudinaryService {

    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
    }

    // Note: this is used during book creation. We intentionally fall back to the
    // default cover so an upload failure does not block the whole "alta" flow, but
    // the failure is logged loudly so it can be detected/retried instead of passing
    // silently. "No source image" is a legitimate fallback and is not treated as an error.
    async transformAndUploadAsset(fileName: string, assetUrl: string | undefined) {
        if (!assetUrl || !assetUrl.length) return DEFAULT_COVER_IMAGE;
        try {
            const base64 = await this.transformAssetToBase64FromUrl(assetUrl);
            return await this.upload(fileName, base64);
        } catch (error) {
            console.error(`[Cloudinary] Cover upload FAILED for "${fileName}" (source: ${assetUrl}). Falling back to default cover — needs retry:`, error);
            return DEFAULT_COVER_IMAGE;
        }
    }

    async upload(fileName: string, base64: string) {
        try {
            const uploadResult = await cloudinary.uploader.upload(base64, {
                public_id: fileName,
                overwrite: true,
                format: "webp",
                folder: "books"
            });

            return uploadResult.secure_url;
        } catch (error) {
            // Propagate: callers that upload an image on purpose (e.g. the portrait
            // endpoint) must not receive a default cover as if the upload succeeded.
            console.error(`[Cloudinary] Upload failed for "${fileName}":`, error);
            throw new Cloudinaryxception(`Could not upload image "${fileName}" to Cloudinary`);
        }
    }

    private async transformAssetToBase64FromUrl(assetUrl: string) {
        try {
            const response = await axios.get(assetUrl, { responseType: 'arraybuffer' });

            const buffer = Buffer.from(response.data, 'binary');
            const base64 = buffer.toString('base64');

            const mimeType = response.headers['content-type'];
            return `data:${mimeType};base64,${base64}`;

        } catch (error: unknown) {
            throw new Cloudinaryxception(`Error al descargar o convertir la imagen: ${error}`);
        }
    }

}
