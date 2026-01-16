import { Avatar, AvatarGroup, Image } from "@nextui-org/react";
import Link from "next/link";
import Rating from "./Rating";

const CardBook = ({ read }: { read: any }) => {
    const usersImage = read.userReads?.slice(0, 3).map((userRead: any) => userRead.user.picture) || [];
    
    return (
        <Link
            href={`/book/${read.isbn}`}
            className="w-full group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 rounded-lg"
            aria-label={`Ver detalles de ${read.title}`}
        >
            <div className="w-full aspect-[9/14] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-neutral-200 relative">
                {/* Image */}
                <Image
                    removeWrapper
                    alt={read.title}
                    className="z-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={read.portrait}
                    isZoomed={false}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                {/* Content - visible on hover or always visible on mobile */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-3 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {/* Title */}
                    <h4 className="font-semibold text-sm line-clamp-2 mb-2">
                        {read.title}
                    </h4>

                    {/* Meta info */}
                    <div className="flex flex-row justify-between items-center gap-2">
                        {/* Avatars */}
                        {usersImage && usersImage.length > 0 ? (
                            <AvatarGroup
                                isBordered
                                max={2}
                                className="flex-shrink-0"
                            >
                                {usersImage.map((image: string) => (
                                    <Avatar
                                        key={image}
                                        src={image}
                                        className="w-5 h-5 text-xs"
                                    />
                                ))}
                            </AvatarGroup>
                        ) : null}

                        {/* Rating */}
                        {read?.averageRating ? (
                            <Rating rate={read.averageRating} />
                        ) : null}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardBook;
