import Link from "next/link"
import { ReactNode } from "react";

type AsideItemType = {
    icon: ReactNode;
    label: string;
    key: string;
    link: string;
}

export const Aside = ({ items }: { items: Array<AsideItemType> }) => {

    return (
        <div className="w-full h-auto py-5 px-4 flex flex-col justify-center items-start gap-8">
            {items.map(item => (<AsideItem key={item.key} item={item} />))}
        </div>
    )
}

export const AsideItem = ({ item }: { item: AsideItemType }) => {
    return (
        <Link className="text-2xl text-white hover:underline flex flex-row justify-start items-center gap-3" href={item.link}>
            {item.icon && item.icon}
            {item.label}
        </Link>
    )
}