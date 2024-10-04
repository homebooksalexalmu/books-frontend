"use client";
import { useUser, } from "@auth0/nextjs-auth0/client"
import { useEffect } from "react";

const PublicRoute = () => {
    const { user, isLoading } = useUser();

    useEffect(() => {
        fetch("/api/token").then(res => res.json()).then(res => {
            if (res.idToken) {
                window.localStorage.setItem("auth0Token", res.idToken)
            }
        });
    }, []);

    if (isLoading) return <p>Loading...</p>

    return (
        <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
            <div className="w-2/4"><pre><code>{JSON.stringify(user, null, 2)}</code></pre></div>
        </div>
    )
}

export default PublicRoute;