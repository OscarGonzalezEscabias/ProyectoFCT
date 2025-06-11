import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { flight_id, seat_number, class: seatClass, is_available, price_modifier } = await request.json();
        const result = await db.query("UPDATE flight_seats SET flight_id = ?, seat_number = ?, class = ?, is_available = ?, price_modifier = ? WHERE id = ?", [flight_id, seat_number, seatClass, is_available, price_modifier, id]);
        
        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ error: "flight_seats not found" }, { status: 404 });
        }

        console.log(result);
        return NextResponse.json({ message: "flight_seats updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update flight_seats" }, { status: 500 });
    }
}