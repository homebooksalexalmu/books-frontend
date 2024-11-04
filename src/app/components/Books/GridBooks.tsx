"use client"
import { useEffect, useState } from "react";
import CardBook from "./CardBook";

const GridBooks = () => {
    const [reads, setReads] = useState<any>([]);

    useEffect(() => {
        const fetchReads = async () => {
            const res = await fetch(`https://books-back-alpha.vercel.app/api/reads`);
            const data = await res.json();
            setReads(data);
        }
        fetchReads();
    }, []);

    return (
        <div className="w-full grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-2 md:gap-6 pb-12">
            {reads.map((read: any) => (<CardBook key={read._id} read={read} />))}
        </div>
    )
}

export default GridBooks;