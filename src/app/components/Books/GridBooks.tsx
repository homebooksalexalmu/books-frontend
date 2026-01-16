"use client"
import { useEffect, useState } from "react";
import CardBook from "./CardBook";
import FilterWrapper from "./Filters/FilterWrapper";
import { Skeleton } from "@nextui-org/react";

const fetchReads = async (params?: Record<string, any>) => {
    const searchParams = new URLSearchParams();
    if (params) {

        for (const key in params) {
            if (params.hasOwnProperty(key) && params[key] !== undefined && params[key] !== null) {
                searchParams.append(key, String(params[key]));
            }
        }
    }

    const res = await fetch(`/api/reads${searchParams.size ? `?${searchParams.toString()}` : ""}`);
    const response = await res.json();
    return response.reads;
}

const GridBooks = () => {
    const [reads, setReads] = useState<any>([]);
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const reads = await fetchReads(filters);
                setReads(reads || []);
            } catch (err) {
                setError("Error al cargar los libros");
                setReads([]);
            } finally {
                setIsLoading(false);
            }
        }
        fetch();
    }, [filters]);

    return (
        <div className="w-full flex flex-col justify-start items-center">
            <FilterWrapper setFilters={setFilters} />
            
            {/* Loading state */}
            {isLoading ? (
                <div className="w-full grid grid-cols-2 gap-3 md:gap-4 pb-12">
                    {Array(6).fill(0).map((_, i) => (
                        <Skeleton key={i} className="rounded-lg aspect-[9/14]" />
                    ))}
                </div>
            ) : null}

            {/* Error state */}
            {error && !isLoading ? (
                <div className="w-full py-12 flex flex-col justify-center items-center text-center">
                    <i className="fa-solid fa-triangle-exclamation text-error text-4xl mb-4"></i>
                    <p className="text-neutral-600">{error}</p>
                </div>
            ) : null}

            {/* Content */}
            {!isLoading && reads && reads.length > 0 ? (
                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4 pb-12">
                    {reads.map((read: any) => (
                        <CardBook key={read._id} read={read} />
                    ))}
                </div>
            ) : null}

            {/* Empty state */}
            {!isLoading && (!reads || reads.length === 0) && !error ? (
                <div className="w-full min-h-[calc(100vh-300px)] flex flex-col justify-center items-center text-center px-4 py-12">
                    <i className="fa-solid fa-book text-neutral-300 text-6xl mb-4"></i>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">Sin libros</h3>
                    <p className="text-neutral-600">No hay libros que coincidan con tus filtros</p>
                </div>
            ) : null}
        </div>
    )
}

export default GridBooks;