import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { user_id, activity_id, total_price, initial_date, final_date } = await request.json();
        const result = await db.query("UPDATE activity_reservations SET user_id = ?, activity_id = ?, total_price = ?, initial_date = ?, final_date = ? WHERE id = ?", [user_id, activity_id, total_price, initial_date, final_date, id]);
        
        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ error: "activity_reservations not found" }, { status: 404 });
        }

        console.log(result);
        return NextResponse.json({ message: "activity_reservations updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update activity_reservations" }, { status: 500 });
    }
}