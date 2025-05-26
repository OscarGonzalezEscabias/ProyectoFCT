import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const { user_id, room_id, check_in, check_out, total_price} = await request.json();
        const result = await db.query("UPDATE reservation SET user_id = ?, room_id = ?, check_in = ?, check_out = ?, total_price = ? WHERE id = ?", [user_id, room_id, check_in, check_out, total_price, id]);
        
        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ error: "Reservation not found" }, { status: 404 });
        }

        console.log(result);
        return NextResponse.json({ message: "Reservation updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update reservation" }, { status: 500 });
    }
}