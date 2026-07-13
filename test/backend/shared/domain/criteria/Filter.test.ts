import { describe, expect, it } from "vitest";
import { Filter } from "@/backend/shared/domain/criteria/Filter";
import { Filters } from "@/backend/shared/domain/criteria/Filters";
import { Operator } from "@/backend/shared/domain/criteria/FilterOperator";
import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";

const map = (entries: Record<string, string>) => new Map(Object.entries(entries));

describe("Filter.fromValues", () => {
    it("builds a Filter from a complete map", () => {
        const filter = Filter.fromValues(map({ field: "name", operator: "=", value: "fantasy" }));

        expect(filter.field.value).toBe("name");
        expect(filter.operator.value).toBe(Operator.EQUAL);
        expect(filter.value.value).toBe("fantasy");
    });

    it.each([
        { operator: "=", value: "x" }, // missing field
        { field: "name", value: "x" }, // missing operator
        { field: "name", operator: "=" }, // missing value
    ] as Record<string, string>[])("throws when a field is missing (%o)", (entries) => {
        expect(() => Filter.fromValues(map(entries))).toThrow(InvalidArgumentException);
    });

    it("throws for an unknown operator", () => {
        expect(() => Filter.fromValues(map({ field: "name", operator: "~", value: "x" }))).toThrow(InvalidArgumentException);
    });
});

describe("Filters", () => {
    it("none() has no filters", () => {
        expect(Filters.none().filters).toHaveLength(0);
    });

    it("fromValues builds a filter per entry", () => {
        const filters = Filters.fromValues([
            map({ field: "name", operator: "=", value: "a" }),
            map({ field: "title", operator: "CONTAINS", value: "b" }),
        ]);

        expect(filters.filters).toHaveLength(2);
        expect(filters.filters[1].operator.value).toBe(Operator.CONTAINS);
    });
});
