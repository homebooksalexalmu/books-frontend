import { UserService } from "@/backend/Users/application/UserService";
import { RatingCreatorService } from "../application/RatingCreator";
import { RatingFinderService } from "../application/RatingFinder";
import { RatingPutController } from "./controller/RatingPutController";
import { IUserRepositoryImpl } from "@/backend/Users/infrastructure/repository/IUserRepositoryImpl";
import { IRatingRepositoryImpl } from "./repository/IRatingRepositoryImpl";
import { RatingUpdaterService } from "../application/RatingUpdater";

const iUserRepositoryImpl = new IUserRepositoryImpl();
const iRatingRepositoryImpl = new IRatingRepositoryImpl();

const userService = new UserService(iUserRepositoryImpl);
const ratingFinder = new RatingFinderService(iRatingRepositoryImpl);
const ratingCreator = new RatingCreatorService(iRatingRepositoryImpl);
const ratingUpdater = new RatingUpdaterService(iRatingRepositoryImpl);

export const ratingPutController = new RatingPutController(userService, ratingFinder, ratingCreator, ratingUpdater);