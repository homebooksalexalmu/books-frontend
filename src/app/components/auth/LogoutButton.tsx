import Link from "next/link";

const LogoutButton = () => (
    <Link href="/api/auth/logout">Logout</Link>
);

export default LogoutButton;