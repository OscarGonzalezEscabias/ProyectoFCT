import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { types, name, description, image, price, available } = await request.json();
        const result = await db.query("UPDATE activities SET types = ?, name = ?, description = ?, image = ?, price = ?, available = ? WHERE id = ?", [types, name, description, image, price, available, id]);
        
        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ error: "Activities not found" }, { status: 404 });
        }

        console.log(result);
        return NextResponse.json({ message: "Activities updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update activities" }, { status: 500 });
    }
}