import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function GET() {
    try {
        const result = await db.query("SELECT * FROM flight_reservations");
        console.log(result);
        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch reservation" }, { status: 500 });
    }
}