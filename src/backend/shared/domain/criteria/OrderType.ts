import { InvalidArgumentException } from "../Errors/InvalidArgumentException";
import { ValueObject } from "../value-object/ValueObject";

export enum OrderTypes {
    ASC = "asc",
    DESC = "desc",
    NONE = "none"
}

export class OrderType extends ValueObject<OrderTypes> {
    constructor(_value: OrderTypes) {
        super(_value);
    }

    static fromValue(value: string): OrderType {
        for (const orderTypeValue of Object.values(OrderTypes)) {
            if (value === orderTypeValue.toString()) {
                return new OrderType(orderTypeValue);
            }
        }

        throw new InvalidArgumentException(`The order type ${value} is invalid`);
    }

    public isNone(): boolean {
        return this.value === OrderTypes.NONE;
    }

    public isAsc(): boolean {
        return this.value === OrderTypes.ASC;
    }

    protected throwErrorForInvalidValue(value: OrderTypes): void {
        throw new InvalidArgumentException(`The order type ${value} is invalid`);
    }
}