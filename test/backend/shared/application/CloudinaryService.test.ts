import { beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryService } from "@/backend/shared/application/CloudinaryService";
import { Cloudinaryxception } from "@/backend/shared/domain/Errors/CloudinaryException";
import { DEFAULT_COVER_IMAGE } from "@/app/utils";

vi.mock("axios", () => ({ default: { get: vi.fn() } }));
vi.mock("cloudinary", () => ({
    v2: {
        config: vi.fn(),
        uploader: { upload: vi.fn() },
    },
}));

const mockedAxiosGet = vi.mocked(axios.get);
const mockedUpload = vi.mocked(cloudinary.uploader.upload);

describe("CloudinaryService", () => {
    let service: CloudinaryService;

    beforeEach(() => {
        vi.clearAllMocks();
        service = new CloudinaryService();
    });

    describe("upload", () => {
        it("returns the secure url on success", async () => {
            mockedUpload.mockResolvedValue({ secure_url: "https://cdn/books/x.webp" } as never);

            await expect(service.upload("x", "data:image/webp;base64,AAA")).resolves.toBe("https://cdn/books/x.webp");
        });

        // #43: an upload failure must NOT be swallowed as a default cover.
        it("propagates a Cloudinaryxception when the upload fails", async () => {
            mockedUpload.mockRejectedValue(new Error("cloudinary down"));

            await expect(service.upload("x", "data:image/webp;base64,AAA")).rejects.toBeInstanceOf(Cloudinaryxception);
        });
    });

    describe("transformAndUploadAsset", () => {
        it("returns the default cover without touching the network when there is no source url", async () => {
            await expect(service.transformAndUploadAsset("x", undefined)).resolves.toBe(DEFAULT_COVER_IMAGE);
            expect(mockedAxiosGet).not.toHaveBeenCalled();
            expect(mockedUpload).not.toHaveBeenCalled();
        });

        it("downloads, transforms and uploads the asset", async () => {
            mockedAxiosGet.mockResolvedValue({ data: Buffer.from("img"), headers: { "content-type": "image/webp" } } as never);
            mockedUpload.mockResolvedValue({ secure_url: "https://cdn/books/x.webp" } as never);

            await expect(service.transformAndUploadAsset("x", "https://src/cover.jpg")).resolves.toBe("https://cdn/books/x.webp");
            expect(mockedAxiosGet).toHaveBeenCalledOnce();
        });

        // #43: during book creation ("alta") a failure falls back to the default cover
        // instead of throwing, so the flow is not blocked.
        it("falls back to the default cover when the download fails", async () => {
            mockedAxiosGet.mockRejectedValue(new Error("404"));

            await expect(service.transformAndUploadAsset("x", "https://src/cover.jpg")).resolves.toBe(DEFAULT_COVER_IMAGE);
        });

        it("falls back to the default cover when the upload fails", async () => {
            mockedAxiosGet.mockResolvedValue({ data: Buffer.from("img"), headers: { "content-type": "image/webp" } } as never);
            mockedUpload.mockRejectedValue(new Error("cloudinary down"));

            await expect(service.transformAndUploadAsset("x", "https://src/cover.jpg")).resolves.toBe(DEFAULT_COVER_IMAGE);
        });
    });
});
