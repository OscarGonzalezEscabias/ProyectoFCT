import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function GET() {
    try {
        const result = await db.query("SELECT * FROM travels");
        console.log(result);
        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch travels" }, { status: 500 });
    }
}