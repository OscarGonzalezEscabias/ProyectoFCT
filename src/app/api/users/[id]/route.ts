import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        const id = await context.params.id;
        const result = await db.query("SELECT * FROM users WHERE id = ?", [id]);

        if ((result as any).length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json((result as any)[0]);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}
