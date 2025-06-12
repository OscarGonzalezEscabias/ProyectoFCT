import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function GET(request: Request, { params }: { params: { hotelId: string } }) {
    try {
        const { hotelId } = params;
        const result = await db.query("SELECT * FROM rooms WHERE hotel_id = ?", [hotelId]);
        console.log(result);
        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
    }
}