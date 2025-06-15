import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const result = await db.query("SELECT * FROM travels WHERE id = ?", [id]);
        console.log(result);
        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch travel" }, { status: 500 });
    }
}