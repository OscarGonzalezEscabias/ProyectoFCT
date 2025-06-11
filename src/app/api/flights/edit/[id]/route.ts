import { NextResponse } from "next/server";
import db from "@/libs/mysql";

// ... (otros métodos)

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const flightData = await request.json();
    
    // Actualizar el vuelo
    await db.query(
      `UPDATE flights SET 
        flight_number = ?,
        airline_id = ?,
        aircraft_id = ?,
        departure_airport_id = ?,
        arrival_airport_id = ?,
        departure_time = ?,
        arrival_time = ?,
        base_price = ?
      WHERE id = ?`,
      [
        flightData.flight_number,
        flightData.airline_id,
        flightData.aircraft_id,
        flightData.departure_airport_id,
        flightData.arrival_airport_id,
        flightData.departure_time,
        flightData.arrival_time,
        flightData.base_price,
        params.id
      ]
    );

    await db.end();
    return NextResponse.json({ message: "Vuelo actualizado exitosamente" });
  } catch (error) {
    await db.end();
    return NextResponse.json(
      { message: "Error al actualizar el vuelo" },
      { status: 500 }
    );
  }
}