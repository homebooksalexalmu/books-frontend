import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";
import { ValueObject } from "@/backend/shared/domain/value-object/ValueObject";

export class CategorySlug extends ValueObject<string> {
    slug: string;

    constructor(name: string) {
        super(name);
        this.ensureCategoryNameIsNotEmpty(name);
        this.slug = this.generateSlug(name);
    }

    private ensureCategoryNameIsNotEmpty(name: string) {
        if (!name || name.trim().length === 0) {
            throw new InvalidArgumentException(`Category name with value <${name}> is not valid.`)
        }
    }

    private generateSlug(term: string) {
        return term
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/ẞ/g, "ss")
            .replace(/[^a-zA-Z0-9\s]/g, "")
            .trim()
            .replace(/ /g, "-")
            .replace(/--+/g, "-")
            .toLowerCase();
    }

}