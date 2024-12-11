import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";
import { ValueObject } from "@/backend/shared/domain/value-object/ValueObject";


export class BookId extends ValueObject<string> {
    isbn: string;

    constructor(_isbn: string) {
        super(_isbn);
        this.ensureBookIdIsAValidIsbnOrEan(_isbn);
        this.isbn = _isbn;
    }
    
    private ensureBookIdIsAValidIsbnOrEan = (isbn: string) => {
        if (!this.isValidIsbnOrEan(isbn)) {
            throw new InvalidArgumentException(`Invalid Argument for isbn with value: ${isbn}`);
        }
    }

    private isValidIsbnOrEan(code: string): boolean {
        const cleanedCode = code.replace(/[-\s]/g, "");
    
        if (/^\d{9}[0-9Xx]$/.test(cleanedCode)) {
            const sum = cleanedCode.trim().split("").reduce((acc, char, i) => 
                acc + (i < 9 ? parseInt(char) * (10 - i) : (char.toUpperCase() === "X" ? 10 : parseInt(char))), 0);
            return sum % 11 === 0;
        }
    
        if (/^\d{13}$/.test(cleanedCode)) {
            const sum = cleanedCode.trim().split("").reduce((acc, char, i) => 
                acc + parseInt(char) * (i % 2 === 0 ? 1 : 3), 0);
            return sum % 10 === 0;
        }
    
        return false;
    };

    get value() {
        return this.isbn.toString();
    }
}