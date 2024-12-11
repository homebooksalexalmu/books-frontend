import { UserId } from "./UserId";

export class User {
    _id?: UserId;
    name: string;
    nick?: string;
    phone?: string;
    verified: boolean;
    email: string;
    picture: string;
    auth0Id: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(props: {
        _id?: UserId;
        name: string;
        nick?: string;
        phone?: string;
        verified: boolean;
        email: string;
        picture: string;
        auth0Id: string;
        createdAt: Date;
        updatedAt: Date;
    }) {
        this._id = props._id;
        this.name = props.name;
        this.nick = props.nick;
        this.phone = props.phone;
        this.verified = props.verified;
        this.email = props.email;
        this.picture = props.picture;
        this.auth0Id = props.auth0Id;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }


    toPrimitives() {
        return {
            _id: this._id?.value,
            name: this.name,
            nick: this.nick,
            phone: this.phone,
            verified: this.verified,
            email: this.email,
            picture: this.picture,
            auth0Id: this.auth0Id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    static fromPrimitives(plainData: {
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
    }): User {
        return new User({
            _id: new UserId(plainData._id),
            name: plainData.name,
            nick: plainData.nick,
            phone: plainData.phone,
            verified: plainData.verified,
            email: plainData.email,
            picture: plainData.picture,
            auth0Id: plainData.auth0Id,
            createdAt: plainData.createdAt,
            updatedAt: plainData.updatedAt,
        });
    }
}