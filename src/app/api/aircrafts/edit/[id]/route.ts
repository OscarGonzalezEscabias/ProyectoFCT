import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { model, airline_id, total_seats } = await request.json();
        const result = await db.query("UPDATE aircrafts SET model = ?, airline_id = ?, total_seats = ? WHERE id = ?", [model, airline_id, total_seats, id]);
        
        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ error: "Aircarft not found" }, { status: 404 });
        }

        console.log(result);
        return NextResponse.json({ message: "Aircarft updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update aircarft" }, { status: 500 });
    }
}