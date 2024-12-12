import { Exception } from "@/backend/shared/domain/Errors/Exception";
import { NextRequest, NextResponse } from "next/server";
import { BookService } from "../../application/BookService";
import { BookId } from "../../domain/BookIdVO";
import { CloudinaryService } from "@/backend/shared/application/CloudinaryService";
import { UploadedFileNotFoundException } from "@/backend/shared/domain/Errors/UploadedFileNotFoundException";

export class BookPutController {

    constructor(private readonly updateService: BookService) { }

    async run(isbn: string, body: any) {
        try {
            await this.updateService.update(new BookId(isbn), body);

            return NextResponse.json({}, { status: 200 });
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Exception) {
                return NextResponse.json({ error: error.name, message: error.message }, { status: error.status });
            }
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }
    }
}

export class BookPutPortraitController {

    constructor(
        private readonly updateService: BookService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    async run(req: NextRequest, isbn: string) {
        try {
            const formData = await req.formData();
            const file: File | undefined = formData.get("file") as unknown as File;

            if (!file) {
                throw new UploadedFileNotFoundException();
            }

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const base64 = buffer.toString("base64");

            const base64Formatted = `data:image/svg+xml;base64,${base64}`;
            const imageUrl = await this.cloudinaryService.upload(isbn, base64Formatted);
            await this.updateService.updatePortrait(new BookId(isbn), imageUrl);

            return NextResponse.json({ base64 }, { status: 200 });
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Exception) {
                return NextResponse.json({ error: error.name, message: error.message }, { status: error.status });
            }
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }
    }
}