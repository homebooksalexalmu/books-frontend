import { UserProvider } from "@auth0/nextjs-auth0/client";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";
import LayoutFactory from "./LayoutFactory";

const Providers = ({ children }: { children: ReactNode }) => (
    <NextUIProvider>
        <UserProvider>
            <LayoutFactory>
                {children}
            </LayoutFactory>
        </UserProvider>
    </NextUIProvider>
);

export default Providers;