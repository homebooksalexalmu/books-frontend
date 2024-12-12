import { ValueObject } from "../value-object/ValueObject";

export class FilterField extends ValueObject<string> {
    constructor(value: string) {
        super(value);
    }
}