import { beforeEach, describe, expect, it, vi } from "vitest";
import { RatingFinderService } from "@/backend/Ratings/application/RatingFinder";
import { IRatingRepository } from "@/backend/Ratings/domain/IRatingRepository";
import { BookId } from "@/backend/Books/domain/BookIdVO";
import { RatingMother } from "../domain/RatingMother";
import { Random } from "../../../helpers/Random";

const makeRepository = (): IRatingRepository => ({
    create: vi.fn(),
    findAll: vi.fn(),
    findByIsbn: vi.fn(),
    update: vi.fn(),
});

describe("RatingFinderService", () => {
    let repository: IRatingRepository;
    let service: RatingFinderService;

    beforeEach(() => {
        repository = makeRepository();
        service = new RatingFinderService(repository);
    });

    it("returns all ratings from the repository", async () => {
        const ratings = [RatingMother.create(), RatingMother.create()];
        vi.mocked(repository.findAll).mockResolvedValue(ratings);

        await expect(service.findAll()).resolves.toBe(ratings);
    });

    it("looks up ratings by isbn wrapping the value in a BookId", async () => {
        const isbn = Random.isbn13();
        vi.mocked(repository.findByIsbn).mockResolvedValue([]);

        await service.findByIsbn(isbn);

        const argument = vi.mocked(repository.findByIsbn).mock.calls[0][0];
        expect(argument).toBeInstanceOf(BookId);
        expect(argument.value).toBe(isbn);
    });
});
