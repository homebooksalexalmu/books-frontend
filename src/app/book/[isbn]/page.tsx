import { getBookReadByIsbn } from "@/app/lib/books";
import Image from "next/image";
import { Button, Chip } from "@nextui-org/react";
import BookPageUsersTabs from "@/app/components/Books/ReadsUserTabs";
import BookDataTable from "@/app/components/Books/BookDataTable";
import Link from "next/link";


const BookPage = async ({ params }: { params: { isbn: string } }) => {
    const [book] = await getBookReadByIsbn(params.isbn);

    return (
        <div className="w-full min-h-screen h-auto px-3 py-1">
            <div className="w-full flex flex-row justify-end items-center p-3">
                <Link href="#">
                    <Button color="primary" variant="bordered" size="sm" className="flex flex-row items-center -z-10">
                        <i className="fa-solid fa-pencil"></i>
                        Editar
                    </Button>
                </Link>
            </div>
            <div className="w-full flex flex-row justify-start items-start">
                <div className="w-4/12 px-4">
                    <Image src={book.portrait} alt={book.title} width={400} height={310} />
                </div>
                <div className="w-8/12 px-4 flex flex-col justify-start items-start gap-3">
                    <h1 className="text-3xl">{book.title}</h1>
                    <p className="text-md">{book.isbn}</p>
                    <p className="text-tiny">{book.authors.map((author: string) => author.toUpperCase()).join(", ")}</p>
                    <div className="w-full flex gap-2">{book.categories.map((category: { _id: string; name: string; }) => (<Chip color="primary" variant="bordered" key={category._id}>{category.name}</Chip>))}</div>
                    <div className="w-full py-4">
                        <BookDataTable data={{ format: book.format, pages: book.pages, publisher: book.publisher }} />
                    </div>
                    <BookPageUsersTabs usersRead={book.userReads} />
                </div>
            </div>
            <div className="w-full mt-10 px-3 pb-4">
                <p className="text-lg underline font-bold">Descripción:</p>
                <p className="text-sm">{book.description}</p>
            </div>
        </div>
    )
}

export default BookPage;