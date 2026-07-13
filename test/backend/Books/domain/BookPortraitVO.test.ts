import { describe, expect, it } from "vitest";
import { BookPortraitVO } from "@/backend/Books/domain/BookPortraitVO";

const DEFAULT_COVER = "https://res.cloudinary.com/dak7ewo4r/image/upload/v1728321097/iawijkqybeyosuy0oltp.jpg";

describe("BookPortraitVO", () => {
    it("keeps the provided portrait url", () => {
        const url = "https://cdn.example.com/cover.webp";
        expect(new BookPortraitVO(url).value).toBe(url);
    });

    it.each([null, undefined])("falls back to the default cover when portrait is %j", (portrait) => {
        expect(new BookPortraitVO(portrait).value).toBe(DEFAULT_COVER);
    });
});
