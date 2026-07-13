import { describe, expect, it, vi } from "vitest";
import { CategoryFinderController, CategoryFinderByIdOrSlugController } from "@/backend/Categories/infrastructure/controllers/CategoryFinderController";
import { CategoryService } from "@/backend/Categories/application/CategoryService";
import { CategoryMother } from "../domain/CategoryMother";

describe("CategoryFinderController", () => {
    it("returns 200 with the categories primitives", async () => {
        const categories = [CategoryMother.create(), CategoryMother.create()];
        const service = { findAll: vi.fn().mockResolvedValue(categories) } as unknown as CategoryService;

        const response = await new CategoryFinderController(service).run();

        expect(response.status).toBe(200);
        const body = await response.json();
        expect(body.categories).toHaveLength(2);
    });

    // Regression guard for #39: the generic branch echoes the raw error to the client.
    it("leaks the raw error object on an unexpected failure (#39)", async () => {
        const service = { findAll: vi.fn().mockRejectedValue({ secret: "internal-detail" }) } as unknown as CategoryService;

        const response = await new CategoryFinderController(service).run();

        expect(response.status).toBe(500);
        await expect(response.json()).resolves.toEqual({ error: { secret: "internal-detail" } });
    });
});

describe("CategoryFinderByIdOrSlugController", () => {
    it("returns 200 with the category when found", async () => {
        const category = CategoryMother.create();
        const service = { findByIdOrSlug: vi.fn().mockResolvedValue(category) } as unknown as CategoryService;

        const response = await new CategoryFinderByIdOrSlugController(service).run("fantasy");

        expect(response.status).toBe(200);
    });

    it("returns 404 when the category does not exist", async () => {
        const service = { findByIdOrSlug: vi.fn().mockResolvedValue(null) } as unknown as CategoryService;

        const response = await new CategoryFinderByIdOrSlugController(service).run("missing");

        expect(response.status).toBe(404);
        await expect(response.json()).resolves.toMatchObject({ error: "CATEGORY_NOT_FOUND" });
    });
});
