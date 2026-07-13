import { describe, expect, it } from "vitest";
import { IReadRepositoryImpl } from "@/backend/Reads/infrastructure/repository/IReadRepositoryImpl";
import { ReadModel, BookModel } from "@/backend/shared/infrastructure/MongoDbClient";
import { BookId } from "@/backend/Books/domain/BookIdVO";
import { ReadBookStatusVO } from "@/backend/Reads/domain/ReadBookStatus";
import { BookReadsStatus } from "@/app/utils";
import { useInMemoryMongo } from "../../../../helpers/mongo";
import { Random } from "../../../../helpers/Random";

const seedRead = (overrides: Partial<{ user: string; book: string; status: string }> = {}) =>
    new ReadModel({
        user: overrides.user ?? Random.objectId(),
        book: overrides.book ?? Random.isbn13(),
        status: overrides.status ?? BookReadsStatus.COMPLETE,
    }).save();

const seedBook = (isbn: string, authors: string[]) =>
    new BookModel({ _id: isbn, title: "T", portrait: Random.url(), publisher: "P", authors }).save();

describe("IReadRepositoryImpl (integration)", () => {
    useInMemoryMongo();
    const repository = new IReadRepositoryImpl();

    it("persists a read with save", async () => {
        await seedRead();

        await expect(ReadModel.countDocuments()).resolves.toBe(1);
    });

    it("finds one read by user and book", async () => {
        const user = Random.objectId();
        const book = Random.isbn13();
        await seedRead({ user, book });

        const read = await repository.findOneByUserAndBook(user, new BookId(book));

        expect(read).toBeDefined();
    });

    it("returns undefined when there is no matching read", async () => {
        const read = await repository.findOneByUserAndBook(Random.objectId(), new BookId(Random.isbn13()));

        expect(read).toBeUndefined();
    });

    it("updates the status filtering by isbn value", async () => {
        const book = Random.isbn13();
        await seedRead({ book, status: BookReadsStatus.PENDING_TO_READ });

        await repository.update(new BookId(book), new ReadBookStatusVO(BookReadsStatus.COMPLETE));

        const reloaded = await ReadModel.findOne({ book });
        expect(reloaded?.status).toBe(BookReadsStatus.COMPLETE);
    });

    it("aggregates the distinct authors across reads", async () => {
        const book = Random.isbn13();
        await Promise.all([seedBook(book, ["Orwell", "Huxley"]), seedRead({ book })]);

        const authors = await repository.findAllAuthors();

        expect(authors).toHaveLength(2);
        expect(authors).toEqual(expect.arrayContaining(["Orwell", "Huxley"]));
    });

    // Regression guard (#33): findAllAuthors reads result[0].authors, which blows up
    // when there are no reads (empty aggregation result).
    it("throws when computing authors on an empty database (#33)", async () => {
        await expect(repository.findAllAuthors()).rejects.toBeDefined();
    });
});
