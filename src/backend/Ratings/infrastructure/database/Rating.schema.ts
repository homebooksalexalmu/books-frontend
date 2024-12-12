import { Schema } from "mongoose";

export const ratingSchema = new Schema({
        user: {
            type: String,
            required: true
        },
        rate: {
            type: Number,
            required: true,
        },
        isbn: {
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

export interface RatingProps extends Document {
    _id: string;
    user: string;
    rate: number;
    isbn: string;
    createdAt: Date;
    updatedAt: Date;
}