"use client"
import { useEffect, useState } from "react";
import CardBook from "./CardBook";
import FilterWrapper from "./Filters/FilterWrapper";

const fetchReads = async (params?: Record<string, any>) => {
    const searchParams = new URLSearchParams();
    if (params) {

        for (const key in params) {
            if (params.hasOwnProperty(key) && params[key] !== undefined && params[key] !== null) {
                searchParams.append(key, String(params[key]));
            }
        }
    }

    const res = await fetch(`https://books-back-alpha.vercel.app/api/reads${searchParams.size ? `?${searchParams.toString()}` : ""}`);
    return await res.json();
}

const GridBooks = () => {
    const [reads, setReads] = useState<any>([]);
    const [filters, setFilters] = useState<Record<string, any>>({});

    useEffect(() => {
        const fetch = async () => {
            const reads = await fetchReads();
            setReads(reads);
        }
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const reads = await fetchReads(filters);
            setReads(reads);
        }
        fetch();
    }, [filters]);

    return (
        <div className="w-full flex flex-col justify-start items-center">
            <FilterWrapper setFilters={setFilters} />
            {
                reads && reads.length ? (
                    <div className="w-full grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-2 md:gap-6 pb-12">
                        {reads.map((read: any) => (<CardBook key={read._id} read={read} />))}
                    </div>
                ) : null
            }
            {!reads || !reads.length ? (
                <div className="w-full h-[55vh] flex flex-row justify-center items-center">
                    <h3 className="text-xl">No hay resultados</h3>
                </div>
            ) : null}
        </div>
    )
}

export default GridBooks;