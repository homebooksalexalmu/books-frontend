import { beforeEach, describe, expect, it, vi } from "vitest";
import { CategoryService } from "@/backend/Categories/application/CategoryService";
import { ICategoryRepository } from "@/backend/Categories/domain/ICategoryRepository";
import { CategoryMother } from "../domain/CategoryMother";

const makeRepository = (): ICategoryRepository => ({
    save: vi.fn(),
    findAll: vi.fn(),
    findByIdOrSlug: vi.fn(),
    search: vi.fn(),
});

describe("CategoryService", () => {
    let repository: ICategoryRepository;
    let service: CategoryService;

    beforeEach(() => {
        repository = makeRepository();
        service = new CategoryService(repository);
    });

    it("delegates findAll to the repository", async () => {
        const categories = [CategoryMother.create(), CategoryMother.create()];
        vi.mocked(repository.findAll).mockResolvedValue(categories);

        await expect(service.findAll()).resolves.toBe(categories);
        expect(repository.findAll).toHaveBeenCalledOnce();
    });

    it("delegates findByIdOrSlug to the repository with the given term", async () => {
        const category = CategoryMother.create();
        vi.mocked(repository.findByIdOrSlug).mockResolvedValue(category);

        await expect(service.findByIdOrSlug("fantasy")).resolves.toBe(category);
        expect(repository.findByIdOrSlug).toHaveBeenCalledWith("fantasy");
    });
});
