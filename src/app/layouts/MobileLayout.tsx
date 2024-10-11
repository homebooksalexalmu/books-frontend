import { ReactNode } from "react";

const MobileLayout = ({ children }: { children: ReactNode }) => {

    return (
        <div className="relative">
            <div className="w-full h-16 bg-red-400">
                Navbar
            </div>
            {children}

            <div className="w-full h-24  fixed bottom-0 left-0 right-0 flex flex-row justify-center items-center">
                <div className="w-3/4 bg-green-400 p-6 rounded-xl">
                    TabBar
                </div>
            </div>
        </div>
    )
}

export default MobileLayout;