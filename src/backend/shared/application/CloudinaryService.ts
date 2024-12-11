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

    async transformAndUploadAsset(fileName: string, assetUrl: string | undefined) {
        if (!assetUrl || !assetUrl.length) return DEFAULT_COVER_IMAGE;
        const base64 = await this.transformAssetToBase64FromUrl(assetUrl);
        return await this.upload(fileName, base64);
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
            console.error(error);
            return DEFAULT_COVER_IMAGE;
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
