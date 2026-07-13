import { describe, expect, it } from "vitest";
import { CriteriaFactory } from "@/backend/shared/domain/criteria/CriteriaFactory";
import { Operator } from "@/backend/shared/domain/criteria/FilterOperator";

describe("CriteriaFactory", () => {
    it("builds a Criteria with the given filter, order and paging", () => {
        const filters = CriteriaFactory.convertObjectToFilter([
            { field: "name", operator: "=", value: "fantasy" },
        ]);

        const criteria = CriteriaFactory.create({
            filters,
            orderBy: "name",
            order: "ASC",
            limit: 25,
            offset: 5,
        });

        expect(criteria.hasFilters()).toBe(true);
        expect(criteria.filters.filters).toHaveLength(1);
        expect(criteria.filters.filters[0].field.value).toBe("name");
        expect(criteria.filters.filters[0].operator.value).toBe(Operator.EQUAL);
        expect(criteria.filters.filters[0].value.value).toBe("fantasy");
        expect(criteria.order.orderBy.value).toBe("name");
        expect(criteria.limit).toBe(25);
        expect(criteria.offset).toBe(5);
    });

    it("drops incomplete filters", () => {
        const filters = CriteriaFactory.convertObjectToFilter([
            { field: "name", operator: "=" } as never,
        ]);

        const criteria = CriteriaFactory.create({ filters, orderBy: undefined, order: undefined });

        expect(criteria.hasFilters()).toBe(false);
    });

    it("defaults the limit to 10 when not provided", () => {
        const criteria = CriteriaFactory.create({ filters: [], orderBy: undefined, order: undefined });

        expect(criteria.limit).toBe(10);
    });
});
