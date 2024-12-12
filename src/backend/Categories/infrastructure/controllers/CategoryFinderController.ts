import { NextResponse } from "next/server";
import { Exception } from "@/backend/shared/domain/Errors/Exception";
import { CategoryService } from "@/backend/Categories/application/CategoryService";
import { CategoryNotFoundException } from "../../domain/CategoryNotFoundException";

export class CategoryFinderController {

    constructor(private readonly categoryFinderService: CategoryService) {}

    async run() {
        try {
            const categories = await this.categoryFinderService.findAll();

            return NextResponse.json({ categories: categories.map(category => category.toPrimitives()) }, {status: 200});
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Exception) {
                return NextResponse.json({ error: error.name, message: error.message }, { status: error.status });
            }
            return NextResponse.json({ error: error }, { status: 500 });
        }
    }

}

export class CategoryFinderByIdOrSlugController {
    constructor(private readonly categoryFinderService: CategoryService) {}

    async run(term: string) {
        try {
            const category = await this.categoryFinderService.findByIdOrSlug(term);

            if (!category) {
                throw new CategoryNotFoundException();
            }

            return NextResponse.json({ category: category.toPrimitives() }, {status: 200});
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Exception) {
                return NextResponse.json({ error: error.name, message: error.message }, { status: error.status });
            }
            return NextResponse.json({ error: error }, { status: 500 });
        }
    }
}
