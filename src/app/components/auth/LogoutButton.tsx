
import Link from "next/link";

const LogoutButton = () => (
    <Link href="/api/auth/logout">
        Cerrar sesión
    </Link>
);

export default LogoutButton;