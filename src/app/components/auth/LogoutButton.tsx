import { Button } from "@nextui-org/react";
import Link from "next/link";

const LogoutButton = () => (
    <Link href="/api/auth/logout">
        <Button className="bg-purple-800 text-white">
            Cerrar Sesión
        </Button>
    </Link>
);

export default LogoutButton;