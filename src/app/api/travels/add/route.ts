import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function POST(request: Request) {
    try {
        const {
            userId,
            name,
            description,
            hotelReservation,
            outboundFlight,
            returnFlight,
            activitiesReservationData,
            totalPrice,
        } = await request.json();

        // 1. Insertar reserva de hotel
        const hotelResult: any = await db.query(
            `INSERT INTO reservation (user_id, room_id, check_in, check_out, total_price)
       VALUES (?, ?, ?, ?, ?)`,
            [
                userId,
                hotelReservation.roomId,
                hotelReservation.checkIn,
                hotelReservation.checkOut,
                hotelReservation.total_price,
            ]
        );
        const hotelReservationId = hotelResult.insertId;

        // 2. Insertar vuelo de ida
        let outboundFlightReservationId: number | null = null;
        if (outboundFlight) {
            const outboundFlightResult: any = await db.query(
                `INSERT INTO flight_reservations (user_id, flight_id, seat_id, total_price)
         VALUES (?, ?, ?, ?)`,
                [
                    userId,
                    outboundFlight.flightId,
                    outboundFlight.seatId,
                    outboundFlight.total_price,
                ]
            );
            outboundFlightReservationId = outboundFlightResult.insertId;
        }

        // 3. Insertar vuelo de vuelta
        let returnFlightReservationId: number | null = null;
        if (returnFlight) {
            const returnFlightResult: any = await db.query(
                `INSERT INTO flight_reservations (user_id, flight_id, seat_id, total_price)
         VALUES (?, ?, ?, ?)`,
                [
                    userId,
                    returnFlight.flightId,
                    returnFlight.seatId,
                    returnFlight.total_price,
                ]
            );
            returnFlightReservationId = returnFlightResult.insertId;
        }

        // 4. Insertar viaje
        const travelResult: any = await db.query(
            `INSERT INTO travels (user_id, name, description, outbound_flight_reservation_id, return_flight_reservation_id, hotel_reservation_id, total_price)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                name,
                description,
                outboundFlightReservationId,
                returnFlightReservationId,
                hotelReservationId,
                totalPrice,
            ]
        );
        const travelId = travelResult.insertId;

        // 5. Insertar reservas de actividades y travel_activities
        for (const activityIdStr of Object.keys(activitiesReservationData)) {
            const activityData = activitiesReservationData[activityIdStr];
            const { initialDate, finalDate, total_price } = activityData;
          
            console.log("Procesando actividad:", activityIdStr, activityData);
            console.log("total_price:", total_price, "typeof:", typeof total_price);
          
            const activityIdNum = Number(activityIdStr); // Convierte string a número para BD
          
            if (typeof total_price !== 'number' || Number.isNaN(total_price)) {
              console.warn(`total_price inválido para actividad ${activityIdStr}, usando 0`);
            }
          
            const validTotalPrice = typeof total_price === "number" && !Number.isNaN(total_price) ? total_price : 0;
          
            const actResult: any = await db.query(
              `INSERT INTO activity_reservations (user_id, activity_id, total_price, initial_date, final_date)
               VALUES (?, ?, ?, ?, ?)`,
              [userId, activityIdNum, validTotalPrice, initialDate, finalDate || null]
            );
          
            const activityReservationId = actResult.insertId;
          
            await db.query(
              `INSERT INTO travel_activities (travel_id, activity_reservation_id)
               VALUES (?, ?)`,
              [travelId, activityReservationId]
            );
          }
          

        return NextResponse.json({ message: "Viaje creado exitosamente", travelId });

    } catch (error) {
        console.error("Error al crear el viaje:", error);
        return NextResponse.json({ error: "Error al crear el viaje" }, { status: 500 });
    }
}
