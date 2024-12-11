import { InvalidArgumentException } from "../Errors/InvalidArgumentException";
import { ValueObject } from "../value-object/ValueObject";

export enum Operator {
    EQUAL = "=",
    NOT_EQUAL = "!=",
    GT = ">",
    LT = "<",
    CONTAINS = "CONTAINS",
    NOT_CONTAINS = "NOT_CONTAINS"
}

export class FilterOperator extends ValueObject<Operator> {
    constructor(_value: Operator) {
        super(_value);
    }

    static fromValue(value: string): FilterOperator {
        for (const operatorValue of Object.values(Operator)) {
            if (value === operatorValue.toString()) {
                return new FilterOperator(operatorValue);
            }
        }

        throw new InvalidArgumentException(`The filter operator ${value} is invalid`);
    }

    public isPositive(): boolean {
        return this.value !== Operator.NOT_EQUAL && this.value !== Operator.NOT_CONTAINS;
    }

    protected throwErrorForInvalidValue(value: Operator): void {
        throw new InvalidArgumentException(`The filter operator ${value} is invalid`);
    }

    static equal() {
        return this.fromValue(Operator.EQUAL);
    }
}