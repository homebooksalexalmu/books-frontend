"use client"
import { useUser } from "@auth0/nextjs-auth0/client";
import { Skeleton, User } from "@nextui-org/react";
import Link from "next/link";
import { ReactNode } from "react";
import LogoutButton from "../components/auth/LogoutButton";

const MobileLayout = ({ children }: { children: ReactNode }) => {
    const { user, isLoading } = useUser();

    if (!user && isLoading) return null;

    if (isLoading) return (
        <div className="relative">
            <div className="w-full h-16 bg-purple-950 flex flex-row justify-end items-center">
                <Skeleton className="rounded-lg">
                    <div className="h-24 rounded-lg bg-default-300"></div>
                </Skeleton>
            </div>
        </div>
    );

    return (
        <div className="relative mb-20">
            <div className="w-full h-16 bg-purple-950 flex flex-row justify-between items-center text-white px-2">
                <Link href="/">Inicio</Link>
                <User avatarProps={{
                    src: user?.picture ?? ""
                }} name={user?.name ?? ""} />
            </div>
            {children}

            <div className="w-full h-24  fixed bottom-0 left-0 right-0 flex flex-row justify-center items-center">
                <div className="w-3/4 bg-purple-950 p-6 rounded-xl flex flex-row justify-evenly items-center text-white">
                    <Link href="/scanner">
                        Scanner
                    </Link>
                    <Link href="/">
                        Libros
                    </Link>
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
}

export default MobileLayout;