import { beforeEach, describe, expect, it } from "vitest";
import { MongoCriteriaConverter } from "@/backend/shared/infrastructure/MongoCriteriaConverter";
import { Criteria } from "@/backend/shared/domain/criteria/Criteria";
import { Filters } from "@/backend/shared/domain/criteria/Filters";
import { Filter } from "@/backend/shared/domain/criteria/Filter";
import { FilterField } from "@/backend/shared/domain/criteria/FilterField";
import { FilterOperator, Operator } from "@/backend/shared/domain/criteria/FilterOperator";
import { FilterValue } from "@/backend/shared/domain/criteria/FilterValue";
import { Order } from "@/backend/shared/domain/criteria/Order";

const filter = (field: string, operator: Operator, value: string) =>
    new Filter(new FilterField(field), new FilterOperator(operator), new FilterValue(value));

describe("MongoCriteriaConverter", () => {
    let converter: MongoCriteriaConverter;

    beforeEach(() => {
        converter = new MongoCriteriaConverter();
    });

    it("returns sensible defaults for an empty criteria", () => {
        const query = converter.convert(new Criteria(Filters.none(), Order.none()));

        expect(query.filter).toEqual({});
        expect(query.sort).toEqual({ _id: -1 });
        expect(query.skip).toBe(0);
        expect(query.limit).toBe(0);
    });

    it("translates an EQUAL filter", () => {
        const criteria = new Criteria(new Filters([filter("name", Operator.EQUAL, "fantasy")]), Order.none());

        expect(converter.convert(criteria).filter).toEqual({ name: { $eq: "fantasy" } });
    });

    it("translates a CONTAINS filter into a regex", () => {
        const criteria = new Criteria(new Filters([filter("title", Operator.CONTAINS, "ring")]), Order.none());

        expect(converter.convert(criteria).filter).toEqual({ title: { $regex: "ring" } });
    });

    it("translates a NOT_CONTAINS filter", () => {
        const criteria = new Criteria(new Filters([filter("title", Operator.NOT_CONTAINS, "ring")]), Order.none());

        expect(converter.convert(criteria).filter).toEqual({ title: { $not: { $regex: "ring" } } });
    });

    it("maps the 'id' order field to '_id'", () => {
        const criteria = new Criteria(Filters.none(), Order.asc("id"));

        expect(converter.convert(criteria).sort).toEqual({ _id: 1 });
    });

    it("honours descending order", () => {
        const criteria = new Criteria(Filters.none(), Order.desc("title"));

        expect(converter.convert(criteria).sort).toEqual({ title: -1 });
    });

    it("passes through paging", () => {
        const criteria = new Criteria(Filters.none(), Order.none(), 20, 40);
        const query = converter.convert(criteria);

        expect(query.limit).toBe(20);
        expect(query.skip).toBe(40);
    });
});
