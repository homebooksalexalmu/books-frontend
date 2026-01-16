"use client"
import { getColorsByStatus, getStatusName } from "@/app/utils";
import { Card, CardHeader, CardBody, Divider, Chip, User } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

const BookPageUsersTabs = ({ usersRead }: { usersRead: any }) => {
    if (!usersRead || usersRead.length === 0) return null;

    return (
        <Card className="bg-white border border-neutral-200">
            <CardHeader className="flex gap-3 px-6 py-4">
                <i className="fa-solid fa-users text-2xl text-primary-600"></i>
                <div className="flex flex-col">
                    <p className="text-lg font-bold text-neutral-900">Lecturas de usuarios</p>
                    <p className="text-sm text-neutral-600">{usersRead.length} {usersRead.length === 1 ? 'usuario' : 'usuarios'} leyendo</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="gap-3 px-2 py-4">
                {usersRead.map((userRead: any) => (
                    <div key={userRead.user._id} className="flex flex-row justify-between items-center p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition">
                        <User 
                            avatarProps={{
                                src: userRead.user?.picture ?? "",
                                className: " aspect-square rounded-full",
                                isBordered: true,
                            }} 
                            description={`Actualizado ${formatDistanceToNow(userRead.updatedAt, { addSuffix: true, locale: es })}`} 
                            name={userRead.user.name}
                            classNames={{
                                base: "gap-3"
                            }}
                        />
                        <Chip className={getColorsByStatus(userRead.status)} size="sm">
                            {getStatusName(userRead.status)}
                        </Chip>
                    </div>
                ))}
            </CardBody>
        </Card>
    );
};

export default BookPageUsersTabs;