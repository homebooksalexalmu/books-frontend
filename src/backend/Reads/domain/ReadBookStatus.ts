import { BookReadsStatus } from "@/app/utils";
import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";
import { ValueObject } from "@/backend/shared/domain/value-object/ValueObject";

export class ReadBookStatusVO extends ValueObject<string> {
    bookStatus: string;

    constructor(_readBookStatus: string) {
        super(_readBookStatus);
        this.ensureReadBookStatus(_readBookStatus);
        this.bookStatus = BookReadsStatus[_readBookStatus as BookReadsStatus];
    }
    
    private ensureReadBookStatus = (status: string) => {
        if (!Object.values(BookReadsStatus).includes(status as BookReadsStatus)) {
            throw new InvalidArgumentException(`Invalid Argument: ReadBookStatus is not a valid status (${Object.values(BookReadsStatus).map(status => `'${status}'`).join(", ")})`);
        }
    }

}