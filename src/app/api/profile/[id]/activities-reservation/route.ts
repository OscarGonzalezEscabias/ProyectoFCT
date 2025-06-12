import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        const id = await context.params.id;
        const result = await db.query("SELECT * FROM activity_reservations WHERE user_id = ?", [id]);
        
        if ((result as any).length === 0) {
            return NextResponse.json({ error: "Activities not found" }, { status: 404 });
        }

        return NextResponse.json((result as any));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
    }
}
