// /app/api/reservation/del/[id]/route.ts
import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id  = params.id;
        const result = await db.query("DELETE FROM flight_reservations WHERE id = ?", [id]);

        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ error: "flight_reservations no encontrada" }, { status: 404 });
        }

        return NextResponse.json({ message: "flight_reservations eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar flight_reservations:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
