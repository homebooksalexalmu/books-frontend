import LoginButton from "./components/auth/LoginButton";
import LogoutButton from "./components/auth/LogoutButton";
import Image from "next/image";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Home() {
  const session = await getSession();

  if (!session) return <p>No hay sesion</p>;

  const { user } = session;

  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      {user ? (
        <>
          <div className="flex flex-col justify-center items-center gap-9">
            <h1 className="text-4xl">{user.name} <small>{user.email_verified === true ? "✅" : "❌"}</small></h1>
            <Image src={user.picture ?? ""} alt={user.nickname ?? ""} width={150} height={150} className="rounded-full" />
            <p>{session.idToken}</p>
          </div>
          <LogoutButton />
        </>
      ) : (<LoginButton />)}
    </div>
  );
}
