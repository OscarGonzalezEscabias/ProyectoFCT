import db from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = await params.id;
        const results = await db.query("SELECT * FROM airlines WHERE id = ?", [id]);
        await db.end();

        if ((results as any).length === 0) {
            return NextResponse.json({ message: "Airline not found" }, { status: 404 });
        }

        return NextResponse.json((results as any)[0]);
    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching airline" },
            { status: 500 }
        );
    }
}