import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const travelId = params.id;

    const activities = await db.query(
      `
      SELECT ar.*, a.name, a.description
      FROM travel_activities ta
      JOIN activity_reservations ar ON ta.activity_reservation_id = ar.id
      JOIN activities a ON ar.activity_id = a.id
      WHERE ta.travel_id = ?
      `,
      [travelId]
    );

    return NextResponse.json(activities);
  } catch (error) {
    console.error("Error al obtener las actividades del viaje:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
