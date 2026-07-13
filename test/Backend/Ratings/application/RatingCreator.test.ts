import { beforeEach, describe, expect, it, vi } from "vitest";
import { RatingCreatorService } from "@/backend/Ratings/application/RatingCreator";
import { IRatingRepository } from "@/backend/Ratings/domain/IRatingRepository";
import { Rating } from "@/backend/Ratings/domain/Rating";
import { RatingMother } from "../domain/RatingMother";

const makeRepository = (): IRatingRepository => ({
    create: vi.fn(),
    findAll: vi.fn(),
    findByIsbn: vi.fn(),
    update: vi.fn(),
});

describe("RatingCreatorService", () => {
    let repository: IRatingRepository;
    let service: RatingCreatorService;

    beforeEach(() => {
        repository = makeRepository();
        service = new RatingCreatorService(repository);
    });

    it("builds a Rating from the body and persists it", async () => {
        const primitives = RatingMother.primitives({ rate: 5 });

        await service.create(primitives);

        expect(repository.create).toHaveBeenCalledOnce();
        const persisted = vi.mocked(repository.create).mock.calls[0][0];
        expect(persisted).toBeInstanceOf(Rating);
        expect(persisted.toPrimitives()).toMatchObject({
            _id: primitives._id,
            isbn: primitives.isbn,
            user: primitives.user,
            rate: 5,
        });
    });
});
