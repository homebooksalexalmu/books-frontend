"use client";

import { Button } from "@nextui-org/react";
import { useEffect } from "react";

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center gap-4 px-3">
            <i className="fa-solid fa-triangle-exclamation text-5xl text-danger"></i>
            <h1 className="text-2xl font-bold text-center">Algo ha ido mal</h1>
            <p className="text-sm text-center text-gray-500 max-w-md">
                Ha ocurrido un error inesperado. Puedes reintentar la acción o volver al inicio.
            </p>
            <div className="flex flex-row gap-3">
                <Button color="primary" onClick={() => reset()}>
                    Reintentar
                </Button>
                <Button variant="bordered" onClick={() => (window.location.href = "/")}>
                    Ir al inicio
                </Button>
            </div>
        </div>
    );
};

export default Error;
