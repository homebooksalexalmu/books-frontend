"use client";
import { Chip } from "@nextui-org/react";
import PortraitModal from "./Modal/PortraitModal";
import RatingModal from "./Modal/RatingModal";
import ReadStatusModal from "./Modal/ReadStatusEditModal";
import Rating from "./Rating";

interface BookHeroProps {
    book: any;
    isbn: string;
}

export const BookHero = ({ book, isbn }: BookHeroProps) => {
    return (
        <div className="w-full bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-50 pt-8 pb-12">
            <div className="w-full max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-stretch">
                    {/* Book Cover */}
                    <div className="w-full md:w-1/3 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl blur-3xl opacity-20"></div>
                            <img
                                src={book.portrait}
                                alt={book.title}
                                className="relative w-full max-w-xs rounded-2xl shadow-2xl object-cover aspect-[9/14]"
                            />
                        </div>
                    </div>

                    {/* Book Info */}
                    <div className="flex-1 flex flex-col justify-center gap-5">
                        {/* Title & Author */}
                        <div className="flex flex-col gap-4">
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg">
                                {book.title}
                            </h1>
                            <div className="flex flex-col gap-2">
                                <p className="text-lg md:text-xl font-semibold text-white/90">
                                    {book.authors.map((author: string) => author).join(", ")}
                                </p>
                                <p className="text-sm font-medium text-white/70">ISBN: {book.isbn}</p>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <Rating rate={book.averageRating} />
                                <span className="text-base font-semibold text-white">
                                    {book.averageRating
                                        ? `${book.averageRating.toFixed(1)} / 5`
                                        : "Sin calificación"}
                                </span>
                            </div>
                        </div>

                        {/* Categories */}
                        {book.categories && book.categories.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {book.categories.map((category: { _id: string; name: string }) => (
                                    <Chip
                                        key={category._id}
                                        className="bg-white/15 text-white border-white/30 backdrop-blur-md font-medium"
                                        variant="bordered"
                                        size="sm"
                                    >
                                        {category.name}
                                    </Chip>
                                ))}
                            </div>
                        ) : null}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            <PortraitModal isbn={isbn} />
                            <RatingModal isbn={isbn} />
                            <ReadStatusModal isbn={isbn} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
