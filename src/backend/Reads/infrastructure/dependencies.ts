import { IUserRepositoryImpl } from "@/backend/Users/infrastructure/repository/IUserRepositoryImpl";
import { ReadService } from "../application/ReadService";
import { ReadFinderByIsbnController, ReadFinderController } from "./controllers/ReadFinderController";
import { IReadRepositoryImpl } from "./repository/IReadRepositoryImpl";

const userRepositoryImpl = new IUserRepositoryImpl();
const readRepositoryImpl = new IReadRepositoryImpl();
const readService = new ReadService(userRepositoryImpl, readRepositoryImpl);
export const readFinderController = new ReadFinderController(readService);

export const readFinderByIsbnController = new ReadFinderByIsbnController(readService);