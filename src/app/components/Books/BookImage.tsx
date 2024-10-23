"use client"
import useIsMobile from "@/app/hooks/useIsMobile";
import Image from "next/image";

const BookImage = ({ book }: { book: any }) => {
    const isMobile = useIsMobile();

    if (!isMobile) {
        return (
            <div className="w-full md:w-4/12 px-4">
                <Image src={book.portrait} alt={book.title} width={400} height={310} />
            </div>
        )
    }

    return (
        <div className="w-full flex flex-row justify-center items-center">
            <div className="w-9/12 px-4 mb-3 relative h-96 shadow-2xl">
                <Image src={book.portrait} alt={book.title} fill className="w-10/12 aspect-[9/16]" />
            </div>
        </div>
    )
}

export default BookImage;