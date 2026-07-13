import { describe, expect, it, vi } from "vitest";
import { RatingCreatorController } from "@/backend/Ratings/infrastructure/controller/RatingCreatorController";
import { RatingFinderController, RatingFinderByIsbnController } from "@/backend/Ratings/infrastructure/controller/RatingFinderController";
import { RatingPutController } from "@/backend/Ratings/infrastructure/controller/RatingPutController";
import { RatingCreatorService } from "@/backend/Ratings/application/RatingCreator";
import { RatingFinderService } from "@/backend/Ratings/application/RatingFinder";
import { RatingUpdaterService } from "@/backend/Ratings/application/RatingUpdater";
import { UserService } from "@/backend/Users/application/UserService";
import { UserMother } from "../../Users/domain/UserMother";
import { jsonRequest } from "../../../helpers/http";
import { Random } from "../../../helpers/Random";

describe("RatingCreatorController", () => {
    it("returns 201 on creation", async () => {
        const creator = { create: vi.fn().mockResolvedValue(undefined) } as unknown as RatingCreatorService;

        const response = await new RatingCreatorController(creator).run(jsonRequest({ rate: 5 }));

        expect(response.status).toBe(201);
        expect(creator.create).toHaveBeenCalledWith({ rate: 5 });
    });
});

describe("RatingFinderController", () => {
    it("returns 200 with all ratings", async () => {
        const finder = { findAll: vi.fn().mockResolvedValue([]) } as unknown as RatingFinderService;

        const response = await new RatingFinderController(finder).run();

        expect(response.status).toBe(200);
    });

    it("returns 404 when there are no ratings for the isbn", async () => {
        const finder = { findByIsbn: vi.fn().mockResolvedValue(null) } as unknown as RatingFinderService;

        const response = await new RatingFinderByIsbnController(finder).run(Random.isbn13());

        expect(response.status).toBe(404);
    });
});

describe("RatingPutController", () => {
    const makeDeps = () => ({
        userService: { findUserByAuth0Id: vi.fn() } as unknown as UserService,
        finder: { findByIsbn: vi.fn() } as unknown as RatingFinderService,
        creator: { create: vi.fn() } as unknown as RatingCreatorService,
        updater: { updateRate: vi.fn() } as unknown as RatingUpdaterService,
    });

    it("returns 404 when the user id is missing", async () => {
        const { userService, finder, creator, updater } = makeDeps();
        const controller = new RatingPutController(userService, finder, creator, updater);

        const response = await controller.run(jsonRequest({ rate: 4 }), Random.isbn13());

        expect(response.status).toBe(404);
    });

    it("returns 400 when the rate is not a number", async () => {
        const { userService, finder, creator, updater } = makeDeps();
        const controller = new RatingPutController(userService, finder, creator, updater);

        const response = await controller.run(jsonRequest({ user: "auth0|1", rate: "abc" }), Random.isbn13());

        expect(response.status).toBe(400);
    });

    it("updates an existing rating for the user", async () => {
        const { userService, finder, creator, updater } = makeDeps();
        const user = UserMother.create();
        vi.mocked(userService.findUserByAuth0Id).mockResolvedValue(user);
        vi.mocked(finder.findByIsbn).mockResolvedValue([
            { _id: "rating-1", user: user._id?.value } as never,
        ]);
        const controller = new RatingPutController(userService, finder, creator, updater);

        const response = await controller.run(jsonRequest({ user: "auth0|1", rate: 5 }), Random.isbn13());

        expect(response.status).toBe(200);
        expect(updater.updateRate).toHaveBeenCalledWith("rating-1", 5);
        expect(creator.create).not.toHaveBeenCalled();
    });

    it("creates a new rating when the user has none for the isbn", async () => {
        const { userService, finder, creator, updater } = makeDeps();
        vi.mocked(userService.findUserByAuth0Id).mockResolvedValue(UserMother.create());
        vi.mocked(finder.findByIsbn).mockResolvedValue([]);
        const controller = new RatingPutController(userService, finder, creator, updater);

        const response = await controller.run(jsonRequest({ user: "auth0|1", rate: 3 }), Random.isbn13());

        expect(response.status).toBe(200);
        expect(creator.create).toHaveBeenCalledOnce();
        expect(updater.updateRate).not.toHaveBeenCalled();
    });
});
