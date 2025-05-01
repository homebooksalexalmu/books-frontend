import { BookService } from "@/backend/Books/application/BookService";
import { BookCreatorController } from "./controllers/BookCreatorController";
import { BookFindOneController } from "./controllers/BookFindOneController";
import { IBookRepositoryImpl } from "./repository/IBookRepositoryImpl";
import { CloudinaryService } from "@/backend/shared/application/CloudinaryService";
import { BookPutController, BookPutPortraitController } from "./controllers/BookPutController";
import { BookAuthorsController } from "./controllers/BookAuthorsController";
import { ReadService } from "@/backend/Reads/application/ReadService";
import { IUserRepositoryImpl } from "@/backend/Users/infrastructure/repository/IUserRepositoryImpl";
import { IReadRepositoryImpl } from "@/backend/Reads/infrastructure/repository/IReadRepositoryImpl";

const bookRepositoryImpl = new IBookRepositoryImpl();
const userRepositoryImpl = new IUserRepositoryImpl();
const readRepositoryImpl = new IReadRepositoryImpl();
const cloudinaryService = new CloudinaryService();
const bookService = new BookService(bookRepositoryImpl, cloudinaryService);
const readService = new ReadService(userRepositoryImpl, readRepositoryImpl);
export const bookFindOneController = new BookFindOneController(bookService);

export const bookCreatorController = new BookCreatorController(bookService);

export const bookPutController = new BookPutController(bookService);
export const bookPutPortraitController = new BookPutPortraitController(bookService, cloudinaryService);
export const bookAuthorsController = new BookAuthorsController(readService);