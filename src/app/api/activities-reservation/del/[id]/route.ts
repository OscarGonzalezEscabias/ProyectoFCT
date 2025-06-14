// /app/api/hotels/del/[id]/route.ts
import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const result = await db.query("DELETE FROM activity_reservations WHERE id = ?", [id]);

        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ error: "activity_reservations no encontrado" }, { status: 404 });
        }

        return NextResponse.json({ message: "activity_reservations eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar activity_reservations:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
