import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";
import { ValueObject } from "@/backend/shared/domain/value-object/ValueObject";

export class RatingRate extends ValueObject<number> {
    rate: number;

    constructor(_rate: number) {
        super(_rate);
        this.ensureRatingRateIsValidNumberFromOneToFive(_rate);
        this.rate = _rate;
    }

    private ensureRatingRateIsValidNumberFromOneToFive(rate: number) {
        if (rate <= 0 && rate >= 6) {
            throw new InvalidArgumentException(`Invalid Argument: Rating rate must be a number between 1 and 5.`);
        }
    }

}