import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        const id = context.params.id;
        const result = await db.query(`
            SELECT t.*, 
                   ofl.departure_time as outbound_departure_time, ofl.arrival_time as outbound_arrival_time,
                   rf.departure_time as return_departure_time, rf.arrival_time as return_arrival_time
            FROM travels t
            LEFT JOIN flights ofl ON t.outbound_flight_reservation_id = ofl.id
            LEFT JOIN flights rf ON t.return_flight_reservation_id = rf.id
            WHERE t.user_id = ?
        `, [id]);

        if ((result as any).length === 0) {
            return NextResponse.json([], { status: 200 });
        }

        const rawTravels = result as any[];

        const travels = rawTravels.map(t => ({
          ...t,
          outboundFlight: {
            departure_time: t.outbound_departure_time,
            arrival_time: t.outbound_arrival_time,
          },
          returnFlight: {
            departure_time: t.return_departure_time,
            arrival_time: t.return_arrival_time,
          },
        }));

        return NextResponse.json(travels);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch travels" }, { status: 500 });
    }
}
