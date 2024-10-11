import { Avatar, AvatarGroup, Card, CardHeader, Image } from "@nextui-org/react";
import Link from "next/link";

const CardBook = ({ read }: { read: any }) => {
    const usersImage = read.userReads.map((userRead: any) => userRead.user.picture);
    return (
        <Link href={`/book/${read.isbn}`}>
            <Card className="col-span-12 sm:col-span-4 h-[300px] shadow-xl group overflow-hidden">
                <CardHeader className="absolute transition-all ease-out delay-200 z-10 bottom-[-15px] flex-col !items-start h-0 group-hover:h-[60%] backdrop-blur-md group-hover:backdrop-blur-xl">
                    <h4 className="text-white font-medium text-large line-clamp-3">{read.title}</h4>
                    {
                        usersImage ? (
                            <div>
                                <AvatarGroup isBordered>
                                    {usersImage.map((image: string) => (<Avatar src={image} key={image} className="w-6 h-6 text-tiny" />))}
                                </AvatarGroup>
                            </div>
                        ) : null
                    }
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
