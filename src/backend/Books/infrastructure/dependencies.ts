import { BookService } from "@/backend/Books/application/BookService";
import { BookCreatorController } from "./controllers/BookCreatorController";
import { BookFindOneController } from "./controllers/BookFindOneController";
import { IBookRepositoryImpl } from "./repository/IBookRepositoryImpl";
import { CloudinaryService } from "@/backend/shared/application/CloudinaryService";
import { BookPutController } from "./controllers/BookPutController";

const bookRepositoryImpl = new IBookRepositoryImpl();
const cloudinaryService = new CloudinaryService();
const bookService = new BookService(bookRepositoryImpl, cloudinaryService);
export const bookFindOneController = new BookFindOneController(bookService);

export const bookCreatorController = new BookCreatorController(bookService);

export const bookPutController = new BookPutController(bookService);