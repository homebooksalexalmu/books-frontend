import { describe, expect, it } from "vitest";
import { ReadBookStatusVO } from "@/backend/Reads/domain/ReadBookStatus";
import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";
import { BookReadsStatus } from "@/app/utils";

describe("ReadBookStatusVO", () => {
    it.each(Object.values(BookReadsStatus))("accepts the valid status %s", (status) => {
        expect(new ReadBookStatusVO(status).value).toBe(status);
    });

    it("throws for an unknown status", () => {
        expect(() => new ReadBookStatusVO("READING_SOMETIMES")).toThrow(InvalidArgumentException);
    });
});
