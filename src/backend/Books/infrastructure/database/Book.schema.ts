import { DEFAULT_BOOK_PAGES } from "@/app/utils";
import { Schema, Types } from "mongoose";

export const bookSchema = new Schema({
        _id: {
            type: String,
            unique: true,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            default: "Sin descripción"
        },
        portrait: {
            type: String,
            required: true
        },
        publisher: {
            type: String,
            required: true,
            default: "Sin editorial"
        },
        authors: {
            type: [String],
            required: true,
            default: []
        },
        categories: {
            type: [Types.ObjectId],
            ref: 'Category',
            required: true,
            default: []
        },
        pages: {
            type: Number,
            required: true,
            default: DEFAULT_BOOK_PAGES
        },
        format: {
            type: String,
            required: false
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

export interface BookProps extends Document {
    _id: string;
    title: string;
    description: string;
    portrait: string;
    publisher: string;
    authors: string[];
    categories: Types.ObjectId[];
    pages: number;
    format?: string;
    createdAt: Date;
    updatedAt: Date;
}