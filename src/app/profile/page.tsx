"use client";
import { User } from "@nextui-org/react";
import LoadingPage from "../components/LoadingPage";
import LogoutButton from "../components/auth/LogoutButton";
import { useAppUser } from "../contexts/UserContext";

const PublicRoute = () => {
    const { user, isLoading } = useAppUser();

    if (isLoading) return <LoadingPage />

    return (
        <main className="w-full min-h-[calc(100vh-120px)] bg-neutral-50 flex flex-col py-6 px-4">
            {/* Profile card */}
            <div className="flex-1 flex flex-col gap-6 max-w-md mx-auto w-full">
                {/* Avatar section */}
                <div className="bg-white rounded-lg p-6 shadow-xs border border-neutral-200">
                    <div className="flex flex-col items-center gap-4">
                        {/* Avatar */}
                        <img
                            src={user?.picture ?? ""}
                            alt={user?.name ?? "User avatar"}
                            className="w-20 h-20 rounded-full border-4 border-primary-600 shadow-md object-cover"
                        />

                        {/* Name */}
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-neutral-900">{user?.name}</h1>
                            <p className="text-neutral-600 text-sm">@{user?.nickname}</p>
                        </div>

                        {/* Email */}
                        <div className="w-full pt-2">
                            <p className="text-xs text-neutral-500 uppercase tracking-wide font-semibold mb-1">Correo</p>
                            <p className="text-neutral-700 text-sm break-all">{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Stats section */}
                <div className="bg-white rounded-lg p-6 shadow-xs border border-neutral-200">
                    <h2 className="text-lg font-semibold text-neutral-900 mb-4">Estadísticas</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-primary-50 rounded-lg">
                            <p className="text-2xl font-bold text-primary-600">--</p>
                            <p className="text-xs text-neutral-600 mt-1">Libros leídos</p>
                        </div>
                        <div className="text-center p-3 bg-secondary-50 rounded-lg">
                            <p className="text-2xl font-bold text-secondary-600">--</p>
                            <p className="text-xs text-neutral-600 mt-1">En progreso</p>
                        </div>
                    </div>
                </div>

                {/* Actions section */}
                <div className="bg-white rounded-lg overflow-hidden shadow-xs border border-neutral-200">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Acciones</h2>
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PublicRoute;