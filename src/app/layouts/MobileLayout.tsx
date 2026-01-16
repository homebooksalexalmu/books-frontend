"use client"
import { Skeleton } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { useAppUser } from "../contexts/UserContext";

const MobileLayout = ({ children }: { children: ReactNode }) => {
    const { user, isLoading } = useAppUser();

    if (!user && isLoading) return null;

    if (isLoading) return (
        <div className="flex flex-col min-h-screen bg-neutral-50">
            <div className="flex-1 pb-28">
                <Skeleton className="rounded-lg m-4 h-32" />
            </div>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-neutral-50 pb-safe-bottom">
            {/* Main content */}
            <main className="flex-1 overflow-y-auto w-full">
                {children}
            </main>

            {/* Bottom navigation - Modern glassmorphism */}
            <nav
                className="fixed bottom-0 left-0 right-0 z-40 w-full"
                style={{
                    paddingBottom: "env(safe-area-inset-bottom)",
                }}
                aria-label="Navegación principal"
            >
                {/* Backdrop blur background */}
                <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl border-t border-white/40" />
                
                {/* Navigation items */}
                <ul className="relative flex flex-row items-center h-20 px-2 gap-1">
                    {/* Resumen */}
                    <li className="flex-1 flex justify-center">
                        <Link
                            href="/"
                            className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-95"
                            aria-label="Resumen"
                        >
                            <i className="fa-solid fa-home text-xl"></i>
                        </Link>
                    </li>

                    {/* Feed */}
                    <li className="flex-1 flex justify-center">
                        <Link
                            href="/feed"
                            className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl text-neutral-600 hover:text-secondary-600 hover:bg-secondary-50 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-95"
                            aria-label="Feed de libros"
                        >
                            <i className="fa-solid fa-book text-xl"></i>
                        </Link>
                    </li>

                    {/* Scanner */}
                    <li className="flex-1 flex justify-center">
                        <Link
                            href="/scanner"
                            className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-95"
                            aria-label="Escanear código de barras"
                        >
                            <i className="fa-solid fa-barcode text-xl"></i>
                        </Link>
                    </li>

                    {/* Búsqueda */}
                    <li className="flex-1 flex justify-center">
                        <Link
                            href="/search"
                            className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-95"
                            aria-label="Buscar"
                        >
                            <i className="fa-solid fa-magnifying-glass text-xl"></i>
                        </Link>
                    </li>

                    {/* Perfil */}
                    <li className="flex-1 flex justify-center">
                        <Link
                            href="/profile"
                            className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-95"
                            aria-label="Perfil"
                        >
                            {user?.picture ? (
                                <Image
                                    src={user.picture}
                                    alt="Tu avatar"
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 rounded-lg object-cover"
                                />
                            ) : (
                                <i className="fa-solid fa-user text-xl"></i>
                            )}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default MobileLayout;
