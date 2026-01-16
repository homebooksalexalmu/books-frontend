import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";
import LayoutFactory from "./LayoutFactory";
import { UserProvider as Auth0UserProvider } from "@auth0/nextjs-auth0/client";
import { UserProvider } from "../contexts/UserContext";

const Providers = ({ children }: { children: ReactNode }) => (
    <NextUIProvider>
        <Auth0UserProvider>
            <UserProvider>
                <LayoutFactory>
                    {children}
                </LayoutFactory>
            </UserProvider>
        </Auth0UserProvider>
    </NextUIProvider>
);

export default Providers;