import { BookService } from "@/backend/Books/application/BookService";
import { BookCreatorController } from "./controllers/BookCreatorController";
import { BookFindOneController } from "./controllers/BookFindOneController";
import { IBookRepositoryImpl } from "./repository/IBookRepositoryImpl";

const bookRepositoryImpl = new IBookRepositoryImpl();
const bookService = new BookService(bookRepositoryImpl);
export const bookFindOneController = new BookFindOneController(bookService);

// TODO: Will remove
export const bookCreatorController = new BookCreatorController(bookService);