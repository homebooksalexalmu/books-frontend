"use client";
import BookEditForm from "@/app/components/Books/Edit/Form";
import { getBookByIsbn } from "@/app/lib/books";
import { CircularProgress } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BookEditPage = () => {
    const params = useParams<{ isbn: string }>()
    const [isBookLoading, setIsBookLoading] = useState<boolean>(false);
    const [bookData, setBookData] = useState<any>();

    useEffect(() => {
        const fetchProductData = async (isbn: string) => {
            setIsBookLoading(true);
            const book = await getBookByIsbn(isbn);
            setBookData(book.book);
            setIsBookLoading(false);
        }

        fetchProductData(params.isbn);
    }, []);

    if (isBookLoading && !bookData) return <div className="w-full h-screen flex flex-row justify-center items-center"><CircularProgress aria-label="Loading..." /></div>;

    return (
        <div className="w-full">
            { bookData && <BookEditForm book={bookData} /> }
        </div>
    )
}
export default BookEditPage;