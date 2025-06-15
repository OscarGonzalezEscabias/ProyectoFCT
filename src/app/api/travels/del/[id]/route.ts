import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const travelId = params.id;

    // 1. Obtener IDs relacionados
    const [travel] = await db.query(
      `SELECT outbound_flight_reservation_id, return_flight_reservation_id, hotel_reservation_id
       FROM travels
       WHERE id = ?`,
      [travelId]
    ) as any[];

    if (!travel) {
      return NextResponse.json({ error: "Viaje no encontrado" }, { status: 404 });
    }

    // 2. Obtener activity_reservation_ids
    const activityReservations = await db.query(
      `SELECT activity_reservation_id FROM travel_activities WHERE travel_id = ?`,
      [travelId]
    );

    const activityReservationIds = (activityReservations as any[]).map((row: any) => row.activity_reservation_id);

    // 3. Eliminar travel_activities
    await db.query(`DELETE FROM travel_activities WHERE travel_id = ?`, [travelId]);

    // 4. Eliminar activity_reservations
    if (activityReservationIds.length > 0) {
      await db.query(
        `DELETE FROM activity_reservations WHERE id IN (${activityReservationIds.map(() => "?").join(",")})`,
        activityReservationIds
      );
    }
    
    // 7. Eliminar el viaje
    await db.query(`DELETE FROM travels WHERE id = ?`, [travelId]);

    // 5. Eliminar reservas de vuelos
    if (travel.outbound_flight_reservation_id) {
      await db.query(`DELETE FROM flight_reservations WHERE id = ?`, [travel.outbound_flight_reservation_id]);
    }
    if (travel.return_flight_reservation_id) {
      await db.query(`DELETE FROM flight_reservations WHERE id = ?`, [travel.return_flight_reservation_id]);
    }

    // 6. Eliminar reserva de hotel
    if (travel.hotel_reservation_id) {
      await db.query(`DELETE FROM reservation WHERE id = ?`, [travel.hotel_reservation_id]);
    }


    return NextResponse.json({ message: "Viaje eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el viaje:", error);
    return NextResponse.json({ error: "Error interno al eliminar el viaje" }, { status: 500 });
  }
}
