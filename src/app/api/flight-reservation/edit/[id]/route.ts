import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const { user_id, flight_id, seat_id, reservation_date, total_price } = await request.json();
        const result = await db.query("UPDATE flight_reservations SET user_id = ?, flight_id = ?, seat_id = ?, reservation_date = ?, total_price = ? WHERE id = ?", [user_id, flight_id, seat_id, reservation_date, total_price, id]);
        
        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ error: "flight_reservations not found" }, { status: 404 });
        }

        console.log(result);
        return NextResponse.json({ message: "flight_reservations updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update flight_reservations" }, { status: 500 });
    }
}