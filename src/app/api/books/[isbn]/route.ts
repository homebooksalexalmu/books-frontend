import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { isbn: string } }) {
    const body = await req.json();
    const { isbn } = params;

    await axios.patch(`https://books-back-alpha.vercel.app/api/books/${isbn}`, body);
    return NextResponse.json({ message: "Updated" });
}