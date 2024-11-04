"use client"
import { getVerifiedUsers } from "@/app/lib/users";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect } from "react";

const Filters = ({ categories }: { categories: Array<{ _id: string; name: string; }>; }) => {

    useEffect(() => {
        const fetchToken = async () => {
            const a = await getVerifiedUsers();
            console.log(a);
        }
        fetchToken();
    }, []);

    return (
        <>
            <Select
                label="Elige tu categoría"
                className="max-w-xs"
            >
                {categories && categories.map((category: { _id: string; name: string; }) => (
                    <SelectItem key={category._id}>
                        {category.name}
                    </SelectItem>
                ))}
            </Select>
        </>
    )
}

export default Filters;