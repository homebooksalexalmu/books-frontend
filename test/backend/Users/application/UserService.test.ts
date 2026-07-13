import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserService } from "@/backend/Users/application/UserService";
import { IUserRepository } from "@/backend/Users/domain/IUserRepository";
import { UserMother } from "../domain/UserMother";

const makeRepository = (): IUserRepository => ({
    save: vi.fn(),
    findAll: vi.fn(),
    findOneByEmailOrAuth0Id: vi.fn(),
    findOneByAuth0Id: vi.fn(),
});

describe("UserService", () => {
    let repository: IUserRepository;
    let service: UserService;

    beforeEach(() => {
        repository = makeRepository();
        service = new UserService(repository);
    });

    it("saves the raw user props on create", async () => {
        const props = UserMother.primitives();

        await service.create(props);

        expect(repository.save).toHaveBeenCalledWith(props);
    });

    it("lists users", async () => {
        const users = [UserMother.create()];
        vi.mocked(repository.findAll).mockResolvedValue(users);

        await expect(service.findAll()).resolves.toBe(users);
    });

    it("looks up a user by email or auth0 id", async () => {
        const user = UserMother.create();
        vi.mocked(repository.findOneByEmailOrAuth0Id).mockResolvedValue(user);

        await expect(service.findUserByEmailOrAuth0Id("a@b.com", "auth0|1")).resolves.toBe(user);
        expect(repository.findOneByEmailOrAuth0Id).toHaveBeenCalledWith("a@b.com", "auth0|1");
    });

    it("looks up a user by auth0 id", async () => {
        const user = UserMother.create();
        vi.mocked(repository.findOneByAuth0Id).mockResolvedValue(user);

        await expect(service.findUserByAuth0Id("auth0|1")).resolves.toBe(user);
        expect(repository.findOneByAuth0Id).toHaveBeenCalledWith("auth0|1");
    });
});
