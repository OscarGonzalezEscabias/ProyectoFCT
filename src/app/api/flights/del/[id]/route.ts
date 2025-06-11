import { NextResponse } from "next/server";
import db from "@/libs/mysql";

// ... (GET method remains the same)

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    // Verificar si hay reservas para este vuelo
    const reservations = await db.query(
      "SELECT id FROM flight_reservations WHERE flight_id = ?",
      [params.id]
    ) as any[];

    if (reservations.length > 0) {
      return NextResponse.json(
        { message: "No se puede eliminar el vuelo porque tiene reservas asociadas" },
        { status: 400 }
      );
    }

    // Eliminar asientos primero
    await db.query(
      "DELETE FROM flight_seats WHERE flight_id = ?",
      [params.id]
    );

    // Luego eliminar el vuelo
    await db.query(
      "DELETE FROM flights WHERE id = ?",
      [params.id]
    );

    await db.end();
    return NextResponse.json({ message: "Vuelo eliminado exitosamente" });
  } catch (error) {
    await db.end();
    return NextResponse.json(
      { message: "Error al eliminar el vuelo" },
      { status: 500 }
    );
  }
}