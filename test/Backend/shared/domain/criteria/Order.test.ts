import { describe, expect, it } from "vitest";
import { Order } from "@/backend/shared/domain/criteria/Order";
import { OrderType, OrderTypes } from "@/backend/shared/domain/criteria/OrderType";
import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";

describe("OrderType", () => {
    it.each(["asc", "desc", "none"])("builds from the valid value %s", (value) => {
        expect(OrderType.fromValue(value).value).toBe(value);
    });

    it("throws for an invalid order type", () => {
        expect(() => OrderType.fromValue("sideways")).toThrow(InvalidArgumentException);
    });

    it("answers isAsc / isNone", () => {
        expect(new OrderType(OrderTypes.ASC).isAsc()).toBe(true);
        expect(new OrderType(OrderTypes.NONE).isNone()).toBe(true);
        expect(new OrderType(OrderTypes.DESC).isAsc()).toBe(false);
    });
});

describe("Order", () => {
    it("none() has no order", () => {
        expect(Order.none().hasOrder()).toBe(false);
    });

    it("asc() / desc() build an ordered criteria", () => {
        const asc = Order.asc("title");
        expect(asc.hasOrder()).toBe(true);
        expect(asc.orderBy.value).toBe("title");
        expect(asc.orderType.isAsc()).toBe(true);

        expect(Order.desc("title").orderType.value).toBe(OrderTypes.DESC);
    });

    it("fromValues falls back to none when no field is given", () => {
        expect(Order.fromValues().hasOrder()).toBe(false);
    });
});
