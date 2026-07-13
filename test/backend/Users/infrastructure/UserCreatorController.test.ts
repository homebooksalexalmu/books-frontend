import { describe, expect, it, vi } from "vitest";
import { UserCreatorController } from "@/backend/Users/infrastructure/controllers/UserCreatorController";
import { UserService } from "@/backend/Users/application/UserService";
import { jsonRequest } from "../../../helpers/http";

describe("UserCreatorController", () => {
    it("returns 201 on creation", async () => {
        const service = { create: vi.fn().mockResolvedValue(undefined) } as unknown as UserService;

        const response = await new UserCreatorController(service).run(jsonRequest({ email: "a@b.com" }));

        expect(response.status).toBe(201);
    });

    // Regression guard for #28: the controller calls `req.json()` WITHOUT awaiting it,
    // so the service receives a Promise instead of the parsed body.
    it("forwards an unresolved Promise to the service instead of the body (#28)", async () => {
        const service = { create: vi.fn().mockResolvedValue(undefined) } as unknown as UserService;

        await new UserCreatorController(service).run(jsonRequest({ email: "a@b.com" }));

        const forwarded = vi.mocked(service.create).mock.calls[0][0];
        expect(forwarded).toBeInstanceOf(Promise);
    });
});
