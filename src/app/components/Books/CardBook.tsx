import { Avatar, AvatarGroup, Card, CardHeader, Image } from "@nextui-org/react";
import Link from "next/link";
import Rating from "./Rating";

const CardBook = ({ read }: { read: any }) => {
    const userReads = read.userReads ?? [];
    return (
        <Link href={`/book/${read.isbn}`} className="w-full">
            <Card className="col-span-12 sm:col-span-4 w-full aspect-[9/14] shadow-xl group overflow-hidden">
                <CardHeader className="absolute transition-all ease-out delay-200 z-10 bottom-[-15px] flex-col !items-start h-0 group-hover:h-[45%] lg:group-hover:h-[60%] backdrop-blur-md group-hover:backdrop-blur-xl">
                    <h4 className="text-white font-medium text-large line-clamp-3">{read.title}</h4>
                    <div className="w-full flex flex-row justify-between items-center">
                        {
                            userReads.length ? (
                                <div>
                                    <AvatarGroup isBordered>
                                        {userReads.map((userRead: any, index: number) => (
                                            <Avatar
                                                src={userRead.user?.picture}
                                                key={userRead.user?._id ?? userRead._id ?? index}
                                                className="w-6 h-6 text-tiny"
                                            />
                                        ))}
                                    </AvatarGroup>
                                </div>
                            ) : null
                        }
                        {
                            read && read.averageRating ? (<Rating rate={read.averageRating} />) : null
                        }
                    </div>
                </CardHeader>
                <Image
                    removeWrapper
                    alt={read.title}
                    className="z-0 w-full h-full object-cover"
                    src={read.portrait}
                />
            </Card>
        </Link>
    )
}

export default CardBook;
