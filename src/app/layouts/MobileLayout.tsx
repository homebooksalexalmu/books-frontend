"use client"
import { useUser } from "@auth0/nextjs-auth0/client";
import { Skeleton, Spacer, User } from "@nextui-org/react";
import Link from "next/link";
import { ReactNode } from "react";

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
        <div className="relative pb-20">
            <div className="w-full h-16 bg-purple-950 flex flex-row justify-between items-center text-white px-4">
                <Link href="/"><i className="fa-solid fa-house"></i></Link>
                <User avatarProps={{
                    src: user?.picture ?? ""
                }} name={user?.name ?? ""} />
            </div>
            {children}

            <div className="w-full h-24 fixed bottom-0 left-0 right-0 flex flex-row justify-center items-center z-[999]">
                <div className="w-11/12 bg-purple-950 p-4 rounded-xl flex flex-row justify-around items-center text-white relative">
                    <Link href="/">
                        <i className="text-3xl fa-solid fa-book"></i>
                    </Link>
                    <Link className="absolute -top-7  bg-purple-800 rounded-full p-4 flex flex-row justify-center items-center" href="/search">
                        <i className="text-4xl fa-solid fa-barcode"></i>
                    </Link>
                    <Spacer />
                    <Link href="/profile">
                        <i className="text-3xl fa-solid fa-user"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MobileLayout;