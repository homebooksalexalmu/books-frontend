"use client"
import { useEffect, useState } from "react";
import CardBook from "./CardBook";
import FilterWrapper from "./Filters/FilterWrapper";

const fetchReads = async (params?: Record<string, any>, signal?: AbortSignal) => {
    const searchParams = new URLSearchParams();
    if (params) {

        for (const key in params) {
            if (params.hasOwnProperty(key) && params[key] !== undefined && params[key] !== null) {
                searchParams.append(key, String(params[key]));
            }
        }
    }

    const res = await fetch(`/api/reads${searchParams.size ? `?${searchParams.toString()}` : ""}`, { signal });
    const response = await res.json();
    return response.reads;
}

const GridBooks = () => {
    const [reads, setReads] = useState<any>([]);
    const [filters, setFilters] = useState<Record<string, any>>({});

    useEffect(() => {
        // Single source of truth for loading reads. `filters` starts as `{}`, so this
        // effect already covers the initial mount — no separate `[]` effect needed
        // (that duplicated the request and raced on slow networks). The AbortController
        // cancels the in-flight request when `filters` changes or the component unmounts,
        // so a stale response can never overwrite a fresher one.
        const controller = new AbortController();

        const load = async () => {
            try {
                const reads = await fetchReads(filters, controller.signal);
                setReads(reads);
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error(error);
                }
            }
        };

        load();

        return () => controller.abort();
    }, [filters]);

    return (
        <div className="w-full flex flex-col justify-start items-center">
            <FilterWrapper setFilters={setFilters} />
            {
                reads && reads.length ? (
                    <div className="w-full grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-2 md:gap-6 pb-12">
                        {reads.map((read: any) => (<CardBook key={read.isbn} read={read} />))}
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