import { isNotUndefined } from "@/shared/utils";

import { Criteria } from "./Criteria";
import { Filter } from "./Filter";
import { FilterField } from "./FilterField";
import { FilterOperator, Operator } from "./FilterOperator";
import { Filters } from "./Filters";
import { FilterValue } from "./FilterValue";
import { Order } from "./Order";
import { OrderBy } from "./OrderBy";
import { OrderType, OrderTypes } from "./OrderType";

export interface SearchInput {
    filters: Array<Map<string, string>>;
    orderBy: any;
    order: any;
    limit?: any;
    offset?: any;
}

export class CriteriaFactory {
    static create(input: SearchInput) {
        const orderBy = input.order === "ASC" ? OrderTypes.ASC : OrderTypes.DESC;
        const criteriaOrder =
            input.orderBy && input.order
                ? new Order(new OrderBy(input.orderBy), new OrderType(orderBy))
                : new Order(new OrderBy("_id"), new OrderType(OrderTypes.ASC));

        const filtersBase = input.filters.map(filter => {
            const field = filter.get("field");
            const op = filter.get("operator");
            const value = filter.get("value");

            const operator = Operator[
                Object.keys(Operator).find(key => Operator[key as keyof typeof Operator] === op) as keyof typeof Operator
            ];

            if (!field || !operator || !value) {
                return undefined;
            }

            return new Filter(
                new FilterField(field),
                new FilterOperator(operator),
                new FilterValue(value)
            );
        }).filter(isNotUndefined);

        const filters = new Filters(filtersBase);
        const limit = input.limit ?? 10;
        const offset = input.offset;
        return new Criteria(filters, criteriaOrder, limit, offset);
    }

    static convertObjectToFilter(data: Array<Record<string, string | number | Array<string>>>) {
        return data.map(obj => {
            const map = new Map<string, any>();
            Object.entries(obj).forEach(([key, value]) => map.set(key, value));
            return map;
        });
    }
}