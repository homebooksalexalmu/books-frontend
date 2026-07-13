import { beforeEach, describe, expect, it, vi } from "vitest";
import { ReadService } from "@/backend/Reads/application/ReadService";
import { IReadRepository } from "@/backend/Reads/domain/IReadRepository";
import { IUserRepository } from "@/backend/Users/domain/IUserRepository";
import { UserNotFoundException } from "@/backend/Users/domain/UserNotFoundException";
import { Exception } from "@/backend/shared/domain/Errors/Exception";
import { BookId } from "@/backend/Books/domain/BookIdVO";
import { ReadBookStatusVO } from "@/backend/Reads/domain/ReadBookStatus";
import { BookReadsStatus } from "@/app/utils";
import { UserMother } from "../../Users/domain/UserMother";
import { Random } from "../../../helpers/Random";

const makeUserRepository = (): IUserRepository => ({
    save: vi.fn(),
    findAll: vi.fn(),
    findOneByEmailOrAuth0Id: vi.fn(),
    findOneByAuth0Id: vi.fn(),
});

const makeReadRepository = (): IReadRepository => ({
    save: vi.fn(),
    find: vi.fn(),
    findOneByUserAndBook: vi.fn(),
    findOneByIsbn: vi.fn(),
    findAllAuthors: vi.fn(),
    update: vi.fn(),
});

describe("ReadService", () => {
    let userRepository: IUserRepository;
    let readRepository: IReadRepository;
    let service: ReadService;

    beforeEach(() => {
        userRepository = makeUserRepository();
        readRepository = makeReadRepository();
        service = new ReadService(userRepository, readRepository);
    });

    describe("create", () => {
        const body = () => ({ user: "auth0|123", book: Random.isbn13(), status: BookReadsStatus.COMPLETE });

        it("throws when the user does not exist", async () => {
            vi.mocked(userRepository.findOneByAuth0Id).mockResolvedValue(null);

            await expect(service.create(body())).rejects.toBeInstanceOf(UserNotFoundException);
            expect(readRepository.save).not.toHaveBeenCalled();
        });

        it("throws a 409 when the read already exists", async () => {
            vi.mocked(userRepository.findOneByAuth0Id).mockResolvedValue(UserMother.create());
            vi.mocked(readRepository.findOneByUserAndBook).mockResolvedValue({} as never);

            await expect(service.create(body())).rejects.toMatchObject({ status: 409 });
            expect(readRepository.save).not.toHaveBeenCalled();
        });

        it("saves the read on the happy path", async () => {
            vi.mocked(userRepository.findOneByAuth0Id).mockResolvedValue(UserMother.create());
            vi.mocked(readRepository.findOneByUserAndBook).mockResolvedValue(null);

            await service.create(body());

            expect(readRepository.save).toHaveBeenCalledOnce();
        });
    });

    it("finds a read by isbn wrapping the value in a BookId", async () => {
        const isbn = Random.isbn13();
        vi.mocked(readRepository.findOneByIsbn).mockResolvedValue(null);

        await service.findOneByIsbn(isbn);

        const argument = vi.mocked(readRepository.findOneByIsbn).mock.calls[0][0];
        expect(argument).toBeInstanceOf(BookId);
        expect(argument.value).toBe(isbn);
    });

    it("forwards status updates to the repository", async () => {
        const isbn = new BookId(Random.isbn13());
        const status = new ReadBookStatusVO(BookReadsStatus.IN_PROGRESS);

        await service.update(isbn, status);

        expect(readRepository.update).toHaveBeenCalledWith(isbn, status);
    });

    it("returns authors alphabetically sorted", async () => {
        vi.mocked(readRepository.findAllAuthors).mockResolvedValue(["Orwell", "Asimov", "Huxley"]);

        await expect(service.findAllAuthors()).resolves.toEqual(["Asimov", "Huxley", "Orwell"]);
    });

    it("throws when the exception is a domain Exception", async () => {
        vi.mocked(userRepository.findOneByAuth0Id).mockResolvedValue(null);

        await expect(service.create({ user: "auth0|x", book: Random.isbn13() })).rejects.toBeInstanceOf(Exception);
    });
});
