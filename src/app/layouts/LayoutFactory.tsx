"use client"
import { ReactNode, useEffect, useState } from "react";
import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";

const LayoutFactory = ({ children }: { children: ReactNode }) => {

    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            {isMobile ? (<MobileLayout>{children}</MobileLayout>) : (<DesktopLayout>{children}</DesktopLayout>)}
        </div>
    )
}

export default LayoutFactory;