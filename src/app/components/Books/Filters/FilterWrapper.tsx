"use client"
import { getCategories } from "@/app/lib/categories";
import Filters from "./Filters";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getBookAuthors } from "@/app/lib/books";

const FilterWrapper = ({ setFilters }: { setFilters: Dispatch<SetStateAction<Record<string, any>>> }) => {
    const [categories, setCategories] = useState<Array<{
        _id: string;
        name: string;
    }>>([]);
    const [authors, setAuthors] = useState<Array<string>>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategories();
            setCategories(categories);
        }
        const fetchAuthors = async () => {
            const result = await getBookAuthors();
            setAuthors(result.authors);
        }
        Promise.all([
            fetchCategories(),
            fetchAuthors()]
        );
    }, []);
    
    return (
        <div className="w-full p-4 md:py-6 md:px-0 bg-white rounded-lg md:rounded-none border-b md:border-b border-neutral-200 md:border-neutral-100 mb-4 md:mb-6">
            <Filters setFilters={setFilters} categories={categories} authors={authors} />
        </div>
    )
}

export default FilterWrapper;