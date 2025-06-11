import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { name, iata_code, logo_url } = await request.json();
        const result = await db.query("UPDATE airlines SET name = ?, iata_code = ?, logo_url = ? WHERE id = ?", [name, iata_code, logo_url, id]);
        
        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ error: "Airline not found" }, { status: 404 });
        }

        console.log(result);
        return NextResponse.json({ message: "Airline updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update airline" }, { status: 500 });
    }
}