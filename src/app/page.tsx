"use client"
import { useEffect, useState } from "react";
import CardBook from "./components/Books/CardBook";

export default function Home() {
  const [reads, setReads] = useState<any>([]);

  useEffect(() => {
    const fetchReads = async () => {
      const res = await fetch("https://books-back-alpha.vercel.app/api/reads");
      const data = await res.json();
      setReads([...data, ...data, ...data, ...data, ...data, ...data]);
    }
    fetchReads();
  }, []);

  return (
    <div className="w-full h-screen grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-6 py-4 px-2 md:px-5">
      {reads.map((read: any) => (<CardBook key={read._id} read={read} />))}
    </div>
  );
}
