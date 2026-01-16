"use client";
import Link from "next/link";
import { Button } from "@nextui-org/react";

interface BookHeaderProps {
    isbn: string;
}

export const BookHeader = ({ isbn }: BookHeaderProps) => {
    return (
        <header className="sticky top-0 z-30 w-full bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 shadow-lg">
            <div className="w-full max-w-6xl mx-auto px-4 py-4 flex flex-row justify-between items-center gap-3">
                <Link href="/feed" className="text-white hover:text-white/80 transition">
                    <i className="fa-solid fa-arrow-left text-xl"></i>
                </Link>
                <div className="flex flex-row gap-2 flex-wrap justify-center flex-1 min-w-0">
                    <Link href={`/book/${isbn}/edit`} className="flex-shrink-0">
                        <Button
                            isIconOnly
                            className="bg-white/20 hover:bg-white/30 text-white border border-white/40"
                            aria-label="Editar libro"
                        >
                            <i className="fa-solid fa-pencil"></i>
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};
