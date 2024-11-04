import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await axios.get("https://books-back-alpha.vercel.app/api/books/9788413442471");
        return NextResponse.json({ message: "Running", result }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Request Failed" }, { status: 500 });
    }
}