"use client"
import { getCategories } from "@/app/lib/categories";
import Filters from "./Filters";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const FilterWrapper = ({ setFilters }: { setFilters: Dispatch<SetStateAction<Record<string, any>>> }) => {
    const [categories, setCategories] = useState<Array<{
        _id: string;
        name: string;
    }>>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategories();
            setCategories(categories);
        }
        fetchCategories();
    }, []);
    return (
        <div className="w-full px-2 my-2 md:my-0 md:py-4 flex flex-col md:flex-row justify-end items-center gap-1 md:gap-4">
            <Filters setFilters={setFilters} categories={categories} />
        </div>
    )
}

export default FilterWrapper;