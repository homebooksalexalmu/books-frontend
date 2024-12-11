import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";

export type Primitives = string | number | boolean | Date | undefined;

export abstract class ValueObject<T extends Primitives> {
    private readonly attribute: T;

    constructor(value: T) {
        this.attribute = value;
        this.ensureValueIsDefined(value);
    }

    private ensureValueIsDefined(value: T): void {
        if (value === null || value === undefined) {
            throw new InvalidArgumentException("Value must be defined");
        }
    }

    equals(other: ValueObject<T>): boolean {
        return other.constructor.name === this.constructor.name && other.attribute === this.attribute;
    }

    toString() {
        return this.attribute?.toString();
    }

    get value() {
        return this.attribute;
    }
}