import { Nullable } from "@/backend/shared/domain/utils";
import { IUserRepository } from "@/backend/Users/domain/IUserRepository";
import { User } from "@/backend/Users/domain/User";
import { UserModel } from "@/backend/shared/infrastructure/MongoDbClient";
import { UserFactory } from "@/backend/Users/domain/UserFactory";
import { Book } from "@/backend/Books/domain/Book";
import { UserAlreadyExistsException } from "../../domain/UserAlreadyExistsException";
import { Exception } from "@/backend/shared/domain/Errors/Exception";

export class IUserRepositoryImpl implements IUserRepository {
    
    constructor() {}
    
    async save(userProps: any): Promise<void> {
        const user = Book.fromPrimitives(userProps);
        try {
            const userPrimitives = user.toPrimitives();
            const newUser = {
                ...userPrimitives,
                auth0Id: userProps.user_id,
                createdAt: userProps.created_at,
                updatedAt: userProps.updated_at,
            }
            const userModel = new UserModel(newUser);
            await userModel.save();
        } catch (error: unknown) {
            if ((error as any).hasOwnProperty("code") && (error as any).code === 11000) {
                throw new UserAlreadyExistsException(`User with email <${userProps.email}> is already exists.`);
            }

            throw new Exception(500, "INTERNAL_SERVER_ERROR", "Internal Server Error");
        }
    }

    async findAll(): Promise<User[]> {
        const users = await UserModel.find({});
        return users.map(user => UserFactory.create(user));
    }

    async findOneByEmailOrAuth0Id(email: string, auth0Id?: string): Promise<Nullable<User>> {
        const userProps = await UserModel.findOne({ email, auth0Id });
        return UserFactory.create(userProps);
    }

    async findOneByAuth0Id(auth0Id: string): Promise<Nullable<User>> {
        const userProps = await UserModel.findOne({ auth0Id });
        return UserFactory.create(userProps);
    }

}