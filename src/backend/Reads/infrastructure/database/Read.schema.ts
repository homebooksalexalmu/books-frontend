import { BookReadsStatus } from "@/app/utils";
import { Schema, Types } from "mongoose";

export const readSchema = new Schema({
        user: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: Object.values(BookReadsStatus),
            default: BookReadsStatus.INACTIVE
        },
        book: {
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

export interface ReadProps extends Document {
    user: Types.ObjectId;
    status: BookReadsStatus;
    book: string;
    createdAt: Date;
    updatedAt: Date;
}