import { beforeEach, describe, expect, it, vi } from "vitest";
import { Types } from "mongoose";
import { BookService } from "@/backend/Books/application/BookService";
import { IBookRepository } from "@/backend/Books/domain/IBookRepository";
import { BookId } from "@/backend/Books/domain/BookIdVO";
import { BookPortraitVO } from "@/backend/Books/domain/BookPortraitVO";
import { CloudinaryService } from "@/backend/shared/application/CloudinaryService";
import { BookMother } from "../domain/BookMother";
import { Random } from "../../../helpers/Random";

const makeRepository = (): IBookRepository => ({
    create: vi.fn(),
    find: vi.fn(),
    findByIsbn: vi.fn(),
    updateCategories: vi.fn(),
    update: vi.fn(),
    updatePortrait: vi.fn(),
});

describe("BookService", () => {
    let repository: IBookRepository;
    let cloudinary: CloudinaryService;
    let service: BookService;

    beforeEach(() => {
        repository = makeRepository();
        cloudinary = {} as CloudinaryService;
        service = new BookService(repository, cloudinary);
    });

    it("persists a book on create", async () => {
        const book = BookMother.create();

        await service.create(book);

        expect(repository.create).toHaveBeenCalledWith(book);
    });

    it("lists books from the repository", async () => {
        const books = [BookMother.create(), BookMother.create()];
        vi.mocked(repository.find).mockResolvedValue(books);

        await expect(service.find()).resolves.toBe(books);
        expect(repository.find).toHaveBeenCalledWith({});
    });

    it("returns the stored book without querying the external provider", async () => {
        const book = BookMother.create();
        vi.mocked(repository.findByIsbn).mockResolvedValue(book);

        await expect(service.findByIsbn(new BookId(book._id.value))).resolves.toBe(book);
        expect(repository.create).not.toHaveBeenCalled();
    });

    it("maps author objects and category ids before updating", async () => {
        const isbn = new BookId(Random.isbn13());
        const categoryId = Random.objectId();

        await service.update(isbn, {
            authors: [{ value: "Orwell" }, { value: "Huxley" }],
            categories: [categoryId],
        } as never);

        const [receivedIsbn, body] = vi.mocked(repository.update).mock.calls[0];
        expect(receivedIsbn).toBe(isbn);
        expect(body.authors).toEqual(["Orwell", "Huxley"]);
        expect(body.categories[0]).toBeInstanceOf(Types.ObjectId);
        expect(String(body.categories[0])).toBe(categoryId);
    });

    it("wraps the portrait url in a value object on updatePortrait", async () => {
        const isbn = new BookId(Random.isbn13());
        const url = Random.url();

        await service.updatePortrait(isbn, url);

        const [, portrait] = vi.mocked(repository.updatePortrait).mock.calls[0];
        expect(portrait).toBeInstanceOf(BookPortraitVO);
        expect(portrait.value).toBe(url);
    });
});
