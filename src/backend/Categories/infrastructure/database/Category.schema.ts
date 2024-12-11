import { Schema } from "mongoose";

export const categorySchema = new Schema({
        name: {
            type: String,
            required: true
        },
        slug: {
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

export interface CategoryProps extends Document {
    _id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}