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
        <div className="w-full px-2 my-2 md:my-0 md:py-4 flex flex-col md:flex-row justify-end items-center gap-1 md:gap-4">
            <Filters setFilters={setFilters} categories={categories} authors={authors} />
        </div>
    )
}

export default FilterWrapper;