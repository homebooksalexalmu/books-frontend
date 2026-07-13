import { User } from "@/backend/Users/domain/User";
import { UserFactory } from "@/backend/Users/domain/UserFactory";
import { UserProps } from "@/backend/Users/infrastructure/database/User.schema";
import { Random } from "../../../helpers/Random";

export interface UserPrimitives {
    _id: string;
    name: string;
    nick: string;
    phone: string;
    verified: boolean;
    email: string;
    picture: string;
    auth0Id: string;
    createdAt: Date;
    updatedAt: Date;
}

export class UserMother {
    static primitives(overrides: Partial<UserPrimitives> = {}): UserPrimitives {
        return {
            _id: Random.objectId(),
            name: Random.word("Name"),
            nick: Random.word("nick"),
            phone: "600000000",
            verified: true,
            email: Random.email(),
            picture: Random.url(),
            auth0Id: `auth0|${Random.hexString(12)}`,
            createdAt: Random.date(),
            updatedAt: Random.date(),
            ...overrides,
        };
    }

    static create(overrides: Partial<UserPrimitives> = {}): User {
        return UserFactory.create(UserMother.primitives(overrides) as unknown as UserProps);
    }
}
