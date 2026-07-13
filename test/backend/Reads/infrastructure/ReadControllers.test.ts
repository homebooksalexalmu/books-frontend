import { describe, expect, it, vi } from "vitest";
import { ReadCreatorController } from "@/backend/Reads/infrastructure/controllers/ReadCreatorController";
import { ReadFinderController, ReadFinderByIsbnController } from "@/backend/Reads/infrastructure/controllers/ReadFinderController";
import { ReadPutController } from "@/backend/Reads/infrastructure/controllers/ReadPutController";
import { ReadService } from "@/backend/Reads/application/ReadService";
import { BookId } from "@/backend/Books/domain/BookIdVO";
import { Exception } from "@/backend/shared/domain/Errors/Exception";
import { BookReadsStatus } from "@/app/utils";
import { jsonRequest, searchParamsRequest } from "../../../helpers/http";
import { Random } from "../../../helpers/Random";

describe("ReadCreatorController", () => {
    it("returns 201 on creation", async () => {
        const service = { create: vi.fn().mockResolvedValue(undefined) } as unknown as ReadService;

        const response = await new ReadCreatorController(service).run(jsonRequest({ user: "auth0|1" }));

        expect(response.status).toBe(201);
    });

    it("maps a domain Exception (e.g. 409 already exists)", async () => {
        const service = { create: vi.fn().mockRejectedValue(new Exception(409, "RESOURCE_ALREADY_EXISTS", "dup")) } as unknown as ReadService;

        const response = await new ReadCreatorController(service).run(jsonRequest({}));

        expect(response.status).toBe(409);
    });

    // Contrast with #39: the Reads controllers hide the raw error behind a generic message.
    it("hides the raw error on an unexpected failure", async () => {
        const service = { create: vi.fn().mockRejectedValue({ secret: "internal-detail" }) } as unknown as ReadService;

        const response = await new ReadCreatorController(service).run(jsonRequest({}));

        expect(response.status).toBe(500);
        await expect(response.json()).resolves.toEqual({ message: "Internal server error" });
    });
});

describe("ReadFinderController", () => {
    it("reads the query params and returns 200", async () => {
        const service = { findAll: vi.fn().mockResolvedValue([]) } as unknown as ReadService;
        const request = searchParamsRequest({ reader: "auth0|1", status: BookReadsStatus.COMPLETE });

        const response = await new ReadFinderController(service).run(request);

        expect(response.status).toBe(200);
        expect(service.findAll).toHaveBeenCalledWith({
            reader: "auth0|1",
            status: BookReadsStatus.COMPLETE,
            categories: null,
            author: null,
        });
    });

    it("returns 404 when no read exists for the isbn", async () => {
        const service = { findOneByIsbn: vi.fn().mockResolvedValue(null) } as unknown as ReadService;

        const response = await new ReadFinderByIsbnController(service).run(new BookId(Random.isbn13()));

        expect(response.status).toBe(404);
    });
});

describe("ReadPutController", () => {
    it("returns 200 with a valid isbn and status", async () => {
        const service = { update: vi.fn().mockResolvedValue(undefined) } as unknown as ReadService;

        const response = await new ReadPutController(service).run(jsonRequest({ status: BookReadsStatus.IN_PROGRESS }), Random.isbn13());

        expect(response.status).toBe(200);
    });

    it("returns 400 for an invalid status", async () => {
        const service = { update: vi.fn() } as unknown as ReadService;

        const response = await new ReadPutController(service).run(jsonRequest({ status: "NOT_A_STATUS" }), Random.isbn13());

        expect(response.status).toBe(400);
        expect(service.update).not.toHaveBeenCalled();
    });
});
