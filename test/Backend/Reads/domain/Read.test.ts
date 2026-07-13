import { describe, expect, it } from "vitest";
import { BookReadsStatus } from "@/app/utils";
import { ReadMother } from "./ReadMother";

describe("Read", () => {
    it("exposes its data as primitives", () => {
        const read = ReadMother.create({ status: BookReadsStatus.COMPLETE });
        const primitives = read.toPrimitives();

        expect(primitives._id).toBe(read._id);
        expect(primitives.user).toBe(read.user);
        expect(primitives.status).toBe(read.status);
        expect(primitives.book).toBe(read.book);
    });

    it("holds a valid status value object", () => {
        const read = ReadMother.create({ status: BookReadsStatus.IN_PROGRESS });

        expect(read.status.value).toBe(BookReadsStatus.IN_PROGRESS);
    });
});
