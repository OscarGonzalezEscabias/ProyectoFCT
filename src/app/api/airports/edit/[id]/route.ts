import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { iata_code, name, city, country } = await request.json();
        const result = await db.query("UPDATE airports SET iata_code = ?, name = ?, city = ?, country = ? WHERE id = ?", [iata_code, name, city, country, id]);
        
        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ error: "Airport not found" }, { status: 404 });
        }

        console.log(result);
        return NextResponse.json({ message: "Airport updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update airport" }, { status: 500 });
    }
}