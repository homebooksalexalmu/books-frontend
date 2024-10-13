"use client";
import { useUser, } from "@auth0/nextjs-auth0/client"
import { User } from "@nextui-org/react";
import { useEffect } from "react";
import LoadingPage from "../components/LoadingPage";

const PublicRoute = () => {
    const { user, isLoading } = useUser();

    useEffect(() => {
        fetch("/api/token").then(res => res.json()).then(res => {
            if (res.idToken) {
                window.localStorage.setItem("auth0Token", res.idToken)
            }
        });
    }, []);

    if (isLoading) return <LoadingPage />

    return (
        <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
            <User
                name={user?.name}
                description={user?.nickname}
                avatarProps={{
                    src: user?.picture ?? ""
                }}
            />
        </div>
    )
}

export default PublicRoute;