// /app/api/hotels/del/[id]/route.ts
import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const result = await db.query("DELETE FROM rooms WHERE id = ?", [id]);

        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ error: "Room no encontrado" }, { status: 404 });
        }

        return NextResponse.json({ message: "Room eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar room:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
