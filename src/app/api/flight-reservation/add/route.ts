import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function POST(request: Request) {
  try {
    const { flight_id, seat_id, total_price, user_id } = await request.json();
    
    // Verificar disponibilidad del asiento
    const seat = await db.query(
      "SELECT is_available FROM flight_seats WHERE id = ?",
      [seat_id]
    ) as any[];
    
    if (seat.length === 0 || !seat[0].is_available) {
      return NextResponse.json(
        { message: "El asiento no está disponible" },
        { status: 400 }
      );
    }
    
    // Todas las operaciones se ejecutan en secuencia
    await db.query(
      "INSERT INTO flight_reservations (user_id, flight_id, seat_id, total_price) VALUES (?, ?, ?, ?)",
      [user_id, flight_id, seat_id, total_price]
    );
    
    await db.query(
      "UPDATE flight_seats SET is_available = FALSE WHERE id = ?",
      [seat_id]
    );
    
    await db.query(
      "UPDATE flights SET available_seats = available_seats - 1 WHERE id = ?",
      [flight_id]
    );
    
    await db.end();
    return NextResponse.json({ message: "Reserva creada exitosamente" });
  } catch (error) {
    await db.end();
    return NextResponse.json(
      { message: "Error al crear reserva" },
      { status: 500 }
    );
  }
}