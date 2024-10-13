"use client"
import { getColorsByStatus, getStatusName } from "@/app/utils";
import { Chip, User } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

const BookPageUsersTabs = ({ usersRead }: { usersRead: any }) => (
    <div className="flex w-full flex-col justify-start items-start gap-8">
        {
            usersRead && usersRead.map((userRead: any) => (
                <div className="w-full flex flex-row justify-between items-center" key={userRead.user._id}>
                    <User avatarProps={{
                        src: userRead.user?.picture ?? ""
                    }} description={`Actualizado  ${formatDistanceToNow(userRead.updatedAt, { addSuffix: true, locale: es })}`} name={userRead.user.name} />
                    <Chip className={getColorsByStatus(userRead.status)}>{getStatusName(userRead.status)}</Chip>
                </div>
            ))
        }
    </div>
);

export default BookPageUsersTabs;