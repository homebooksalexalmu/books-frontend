import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { isbn: string } }) {
    try {
        const body = await req.json();
        const { isbn } = params;

        await axios.patch(`https://books-back-alpha.vercel.app/api/books/${isbn}`, body);
        return NextResponse.json({ message: "Updated" });
    } catch (error: unknown) {
        console.log(error)
        return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 })
    }
}