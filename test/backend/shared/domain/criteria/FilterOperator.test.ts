import { describe, expect, it } from "vitest";
import { FilterOperator, Operator } from "@/backend/shared/domain/criteria/FilterOperator";
import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";

describe("FilterOperator", () => {
    it("builds from a valid operator value", () => {
        expect(FilterOperator.fromValue("=").value).toBe(Operator.EQUAL);
        expect(FilterOperator.fromValue("CONTAINS").value).toBe(Operator.CONTAINS);
    });

    it("throws for an unknown operator", () => {
        expect(() => FilterOperator.fromValue("~=")).toThrow(InvalidArgumentException);
    });

    it("knows which operators are positive", () => {
        expect(FilterOperator.fromValue("=").isPositive()).toBe(true);
        expect(FilterOperator.fromValue("!=").isPositive()).toBe(false);
        expect(FilterOperator.fromValue("NOT_CONTAINS").isPositive()).toBe(false);
    });

    it("exposes an equal() shortcut", () => {
        expect(FilterOperator.equal().value).toBe(Operator.EQUAL);
    });
});
