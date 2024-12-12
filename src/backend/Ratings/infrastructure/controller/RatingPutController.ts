import { Exception } from "@/backend/shared/domain/Errors/Exception";
import { InvalidArgumentException } from "@/backend/shared/domain/Errors/InvalidArgumentException";
import { UserService } from "@/backend/Users/application/UserService";
import { UserNotFoundException } from "@/backend/Users/domain/UserNotFoundException";
import { NextRequest, NextResponse } from "next/server";
import { RatingFinderService } from "@/backend/Ratings/application/RatingFinder";
import { RatingCreatorService } from "@/backend/Ratings/application/RatingCreator";
import { Types } from "mongoose";
import { RatingUpdaterService } from "../../application/RatingUpdater";

export class RatingPutController {

    constructor(
        private readonly userService: UserService,
        private readonly ratingFinder: RatingFinderService,
        private readonly ratingCreator: RatingCreatorService,
        private readonly ratingUpdater: RatingUpdaterService
    ) { }

    async run(req: NextRequest, isbn: string) {
        try {
            const body = await req.json();
            const userId = body.user as string;
            const rate = Number(body.rate) as number;

            if (!userId) {
                throw new UserNotFoundException();
            }

            if (!rate || isNaN(rate)) {
                throw new InvalidArgumentException(`Rate must be a number between 1 and 5`);
            }

            const user = await this.userService.findUserByAuth0Id(userId);

            if (!user) {
                throw new UserNotFoundException();
            }

            const ratingsByIsbn = await this.ratingFinder.findByIsbn(isbn);
            const existingRatingRatingWithUserAndIsbn = ratingsByIsbn.find(rating =>
                String(rating.user) === String(user._id)
            );

            if (existingRatingRatingWithUserAndIsbn) {
                await this.ratingUpdater.updateRate(existingRatingRatingWithUserAndIsbn._id, rate);
            } else {
                const ratingId = String(new Types.ObjectId());
                const rating = {
                    _id: ratingId,
                    user: String(user._id),
                    rate: rate,
                    isbn: isbn,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                await this.ratingCreator.create(rating);
            }

            return NextResponse.json({ ...body, isbn }, { status: 200 });
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Exception) {
                return NextResponse.json({ error: error.name, message: error.message }, { status: error.status });
            }
            return NextResponse.json({ error: error }, { status: 500 });
        }
    }
}