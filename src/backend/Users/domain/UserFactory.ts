import { UserProps } from "../infrastructure/database/User.schema";
import { User } from "./User";
import { UserId } from "./UserId";

export class UserFactory {
    static create(props: UserProps): User {
        return new User({
            _id: new UserId(props._id),
            name: props.name,
            nick: props.nick,
            phone: props.phone,
            verified: props.verified,
            email: props.email,
            picture: props.picture,
            auth0Id: props.auth0Id,
            createdAt: props.createdAt,
            updatedAt: props.updatedAt,
        });
    }
}