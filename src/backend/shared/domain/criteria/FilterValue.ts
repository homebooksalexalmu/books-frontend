import { ValueObject } from "../value-object/ValueObject";

export class FilterValue extends ValueObject<string> {
    constructor(value: string) {
        super(value);
    }
}