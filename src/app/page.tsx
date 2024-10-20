"use client"
import { useEffect, useState } from "react";
import CardBook from "./components/Books/CardBook";

export default function Home() {
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
    <div className="w-full h-screen py-4 px-2 md:px-5">
      <div className="w-full px-2 py-4">
        <h1 className="text-xl">Filters</h1>
      </div>
      <div className="w-full grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-2 md:gap-6 pb-30">
        {reads.map((read: any) => (<CardBook key={read._id} read={read} />))}
      </div>
    </div>
  );
}
