import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { name, hotel_id, description, capacity, price, image } = await request.json();
        const result = await db.query("UPDATE rooms SET name = ?, hotel_id = ?, description = ?, capacity = ?, price = ?, image = ? WHERE id = ?", [name, hotel_id, description, capacity, price, image, id]);
        
        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ error: "Room not found" }, { status: 404 });
        }

        console.log(result);
        return NextResponse.json({ message: "Room updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update room" }, { status: 500 });
    }
}