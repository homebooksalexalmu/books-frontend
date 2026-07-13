/**
 * Small, dependency-free random data helpers used by the ObjectMothers.
 *
 * Kept intentionally tiny (no faker) so the test suite has no extra runtime
 * dependencies. Every generator returns values that satisfy the domain
 * invariants of the value objects they feed (valid ObjectIds, valid ISBNs...).
 */
export class Random {
    static integer(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static hexString(length: number): string {
        const chars = "0123456789abcdef";
        return Array.from({ length }, () => chars[Random.integer(0, chars.length - 1)]).join("");
    }

    /** A syntactically valid Mongo ObjectId (24 hex chars). */
    static objectId(): string {
        return Random.hexString(24);
    }

    /** A valid EAN-13 / ISBN-13 code (checksum digit computed). */
    static isbn13(): string {
        const digits = Array.from({ length: 12 }, () => Random.integer(0, 9));
        const sum = digits.reduce((acc, digit, index) => acc + digit * (index % 2 === 0 ? 1 : 3), 0);
        const check = (10 - (sum % 10)) % 10;
        return [...digits, check].join("");
    }

    static word(prefix = "word"): string {
        return `${prefix}-${Random.hexString(6)}`;
    }

    static words(count: number, prefix = "word"): string[] {
        return Array.from({ length: count }, () => Random.word(prefix));
    }

    static element<T>(items: readonly T[]): T {
        return items[Random.integer(0, items.length - 1)];
    }

    static boolean(): boolean {
        return Math.random() < 0.5;
    }

    static email(): string {
        return `${Random.word("user")}@example.com`;
    }

    static url(): string {
        return `https://cdn.example.com/${Random.hexString(10)}.webp`;
    }

    static date(): Date {
        return new Date(2020, 0, 1);
    }
}
