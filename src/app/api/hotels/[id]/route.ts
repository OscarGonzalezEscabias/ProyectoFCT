import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const result = await db.query("SELECT * FROM hotel WHERE id = ?", [id]);
        
        if ((result as any).length === 0) {
            return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
        }

        return NextResponse.json((result as any)[0]);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch hotels" }, { status: 500 });
    }
}