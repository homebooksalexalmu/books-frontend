import { UserService } from "../application/UserService";
import { UserCreatorController } from "./controllers/UserCreatorController";
import { IUserRepositoryImpl } from "./repository/IUserRepositoryImpl";

const userRepository = new IUserRepositoryImpl();
const userService = new UserService(userRepository);

export const userCreatorController = new UserCreatorController(userService);