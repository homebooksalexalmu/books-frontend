import { IUserRepository } from "@/backend/Users/domain/IUserRepository";
import { User } from "@/backend/Users/domain/User";
import { Nullable } from "@/backend/shared/domain/utils";

export class UserService {
    
    constructor(private readonly userRepository: IUserRepository) {}

    async create(userProps: any): Promise<void> {
        await this.userRepository.save(userProps);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async findUserByEmailOrAuth0Id(email: string, auth0Id?: string): Promise<Nullable<User>> {
        return this.userRepository.findOneByEmailOrAuth0Id(email, auth0Id);
    }

    async findUserByAuth0Id(auth0Id: string): Promise<Nullable<User>> {
        return this.userRepository.findOneByAuth0Id(auth0Id);
    }

}