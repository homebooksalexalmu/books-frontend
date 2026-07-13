import { beforeEach, describe, expect, it, vi } from "vitest";
import { RatingUpdaterService } from "@/backend/Ratings/application/RatingUpdater";
import { IRatingRepository } from "@/backend/Ratings/domain/IRatingRepository";
import { RatingId } from "@/backend/Ratings/domain/RatingId";
import { Random } from "../../../helpers/Random";

const makeRepository = (): IRatingRepository => ({
    create: vi.fn(),
    findAll: vi.fn(),
    findByIsbn: vi.fn(),
    update: vi.fn(),
});

describe("RatingUpdaterService", () => {
    let repository: IRatingRepository;
    let service: RatingUpdaterService;

    beforeEach(() => {
        repository = makeRepository();
        service = new RatingUpdaterService(repository);
    });

    it("forwards the rating id and rate to the repository", async () => {
        const ratingId = new RatingId(Random.objectId());

        await service.updateRate(ratingId, 3);

        expect(repository.update).toHaveBeenCalledWith(ratingId, 3);
    });
});
