import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const result = await db.query("SELECT * FROM reservation WHERE user_id = ?", [id]);
        
        if ((result as any).length === 0) {
            return NextResponse.json({ error: "Reservas not found" }, { status: 404 });
        }

        return NextResponse.json((result as any)[0]);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch reservas" }, { status: 500 });
    }
}