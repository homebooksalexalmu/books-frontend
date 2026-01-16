import { unstable_noStore } from "next/cache";
import { getBookReadByIsbn } from "@/app/lib/reads";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import BookPageUsersTabs from "@/app/components/Books/ReadsUserTabs";
import { BookHero } from "@/app/components/Books/BookHero";
import { BookDetails } from "@/app/components/Books/BookDetails";
import { BookSynopsis } from "@/app/components/Books/BookSynopsis";

const BookPage = async ({ params }: { params: { isbn: string } }) => {
    unstable_noStore();
    const book = await getBookReadByIsbn(params.isbn, true);

    return (
        <main className="w-full min-h-screen bg-neutral-50 pb-24">
            {/* Hero Section */}
            <BookHero book={book} isbn={params.isbn} />

            {/* Main Content */}
            <div className="w-full max-w-6xl mx-auto px-4 py-8">
                {/* Details Grid */}
                <section className="mb-8">
                    <BookDetails
                        publisher={book.publisher}
                        pages={book.pages}
                        format={book.format}
                    />
                </section>

                {/* Synopsis */}
                <section className="mb-8">
                    <BookSynopsis description={book.description} />
                </section>

                {/* Users reads section */}
                <section>
                    <BookPageUsersTabs usersRead={book.userReads} />
                </section>
            </div>

            {/* Floating Action Button - Edit */}
            <Link href={`/book/${params.isbn}/edit`} className="fixed bottom-24 left-6 z-[99] md:bottom-16 md:left-8">
                <Button
                    isIconOnly
                    className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary-600 to-secondary-600 hover:shadow-2xl shadow-lg text-white rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="Editar libro"
                >
                    <i className="fa-solid fa-pencil text-xl md:text-2xl"></i>
                </Button>
            </Link>
        </main>
    );
};

export default BookPage;