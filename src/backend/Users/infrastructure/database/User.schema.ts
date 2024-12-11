import { Schema } from "mongoose";

export const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nick: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    verified: {
        type: Boolean,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    auth0Id: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: () => new Date()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: () => new Date()
    }
});

export interface UserProps extends Document {
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