import { Nullable } from "@/backend/shared/domain/utils";
import { User } from "./User";

export interface IUserRepository {
    save(user: Record<string, unknown>): Promise<void>;
    findAll(): Promise<User[]>;
    findOneByEmailOrAuth0Id(email: string, auth0Id?: string): Promise<Nullable<User>>;
    findOneByAuth0Id(auth0Id: string): Promise<Nullable<User>>;
}