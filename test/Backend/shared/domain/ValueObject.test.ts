import { describe, expect, it } from "vitest";
import { ValueObject } from "@/backend/shared/domain/value-object/ValueObject";
import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";

class StringValue extends ValueObject<string> {}
class OtherStringValue extends ValueObject<string> {}

describe("ValueObject", () => {
    it("exposes the wrapped value", () => {
        expect(new StringValue("hello").value).toBe("hello");
    });

    it("stringifies the wrapped value", () => {
        expect(new StringValue("hello").toString()).toBe("hello");
    });

    it.each([null, undefined])("throws when the value is %j", (value) => {
        expect(() => new StringValue(value as unknown as string)).toThrow(InvalidArgumentException);
    });

    it("is equal to another instance of the same type and value", () => {
        expect(new StringValue("a").equals(new StringValue("a"))).toBe(true);
    });

    it("is not equal when the value differs", () => {
        expect(new StringValue("a").equals(new StringValue("b"))).toBe(false);
    });

    it("is not equal when the type differs even if the value matches", () => {
        expect(new StringValue("a").equals(new OtherStringValue("a"))).toBe(false);
    });
});
