import { readFinderController } from "@/backend/Reads/infrastructure/dependencies";
import { MongoClientFactory } from "@/backend/shared/infrastructure/MongoDbClient";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        await axios.post(`https://books-back-alpha.vercel.app/api/reads`, body);
        return NextResponse.json({ message: "Created!" }, { status: 201 });
    } catch (err: unknown) {
        console.log(err);
        return NextResponse.json({ message: "Error" });
    }
}

export async function GET() {
    await MongoClientFactory.createAndConnectClient();
    return readFinderController.run();
}