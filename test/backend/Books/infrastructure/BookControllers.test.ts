import { describe, expect, it, vi } from "vitest";
import { BookPutController } from "@/backend/Books/infrastructure/controllers/BookPutController";
import { BookFindOneController } from "@/backend/Books/infrastructure/controllers/BookFindOneController";
import { BookCreatorController } from "@/backend/Books/infrastructure/controllers/BookCreatorController";
import { BookAuthorsController } from "@/backend/Books/infrastructure/controllers/BookAuthorsController";
import { BookService } from "@/backend/Books/application/BookService";
import { ReadService } from "@/backend/Reads/application/ReadService";
import { Exception } from "@/backend/shared/domain/Errors/Exception";
import { BookMother } from "../domain/BookMother";
import { jsonRequest } from "../../../helpers/http";
import { Random } from "../../../helpers/Random";

describe("BookPutController", () => {
    it("returns 200 when the update succeeds", async () => {
        const service = { update: vi.fn().mockResolvedValue(undefined) } as unknown as BookService;
        const controller = new BookPutController(service);

        const response = await controller.run(Random.isbn13(), {});

        expect(response.status).toBe(200);
    });

    it("maps a domain Exception to its status", async () => {
        const service = { update: vi.fn().mockRejectedValue(new Exception(404, "NOT_FOUND", "nope")) } as unknown as BookService;
        const controller = new BookPutController(service);

        const response = await controller.run(Random.isbn13(), {});

        expect(response.status).toBe(404);
        await expect(response.json()).resolves.toMatchObject({ error: "NOT_FOUND", message: "nope" });
    });

    it("falls back to 500 on an unexpected error", async () => {
        const service = { update: vi.fn().mockRejectedValue(new Error("boom")) } as unknown as BookService;
        const controller = new BookPutController(service);

        const response = await controller.run(Random.isbn13(), {});

        expect(response.status).toBe(500);
    });
});

describe("BookFindOneController", () => {
    it("returns 200 with the book primitives", async () => {
        const book = BookMother.create();
        const service = { findByIsbn: vi.fn().mockResolvedValue(book) } as unknown as BookService;
        const controller = new BookFindOneController(service);

        const response = await controller.run(book._id.value);

        expect(response.status).toBe(200);
        await expect(response.json()).resolves.toMatchObject({ book: { _id: book._id.value } });
    });

    it("returns 400 for an invalid isbn without hitting the service", async () => {
        const service = { findByIsbn: vi.fn() } as unknown as BookService;
        const controller = new BookFindOneController(service);

        const response = await controller.run("not-an-isbn");

        expect(response.status).toBe(400);
        expect(service.findByIsbn).not.toHaveBeenCalled();
    });
});

describe("BookCreatorController", () => {
    it("returns 201 and forwards the parsed body", async () => {
        const service = { create: vi.fn().mockResolvedValue(undefined) } as unknown as BookService;
        const controller = new BookCreatorController(service);

        const response = await controller.run(jsonRequest({ title: "x" }));

        expect(response.status).toBe(201);
        expect(service.create).toHaveBeenCalledWith({ title: "x" });
    });
});

describe("BookAuthorsController", () => {
    it("returns 200 with the authors list", async () => {
        const service = { findAllAuthors: vi.fn().mockResolvedValue(["Orwell"]) } as unknown as ReadService;
        const controller = new BookAuthorsController(service);

        const response = await controller.run();

        expect(response.status).toBe(200);
        await expect(response.json()).resolves.toEqual({ authors: ["Orwell"] });
    });
});
