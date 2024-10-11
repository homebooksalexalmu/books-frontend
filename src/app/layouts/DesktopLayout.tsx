import { useUser } from "@auth0/nextjs-auth0/client";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import LogoutButton from "../components/auth/LogoutButton";
import Link from "next/link";
import LoadingPage from "../components/LoadingPage";

const DesktopLayout = ({ children }: { children: ReactNode }) => {
    const { user, isLoading } = useUser();

    if (!isLoading && !user) redirect("/");

    if (isLoading && !user) return <LoadingPage />

    return (
        <div className="flex h-screen overflow-hidden">
            <aside className="absolute left-0 top-0 z-9999 flex h-screen w-72 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 -translate-x-full">
                <div className="w-full flex flex-row justify-center items-center py-7">
                    <h1 className="text-3xl text-white">Home Library</h1>
                </div>
                <p className="text-white">aside</p>
                <Link className="text-white" href="/search">Buscar</Link>
            </aside>
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden z-40 bg-white">
                <header className="sticky top-0 z-999 px-3 flex flex-row justify-end items-center w-full h-16 bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none border-b-1">
                    <Dropdown>
                        <DropdownTrigger>
                            <User
                                className="cursor-pointer"
                                name={user?.name}
                                description={(
                                    <p>
                                        @{user?.nickname}
                                    </p>
                                )}
                                avatarProps={{
                                    src: user?.picture ?? ""
                                }}
                            />
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Dropdown Variants"
                            color="primary"
                            variant="faded"
                        >
                            <DropdownItem key="new">
                                <Link href="/profile">Perfil</Link>
                            </DropdownItem>
                            <DropdownItem key="delete" className="text-danger" color="danger">
                                <LogoutButton />
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </header>
                {children}
            </div>
        </div>
    )
}

export default DesktopLayout;