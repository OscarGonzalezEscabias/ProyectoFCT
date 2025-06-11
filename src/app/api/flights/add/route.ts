import { NextResponse } from "next/server";
import db from "@/libs/mysql";

// ... (GET method remains the same)

export async function POST(request: Request) {
  try {
    const flightData = await request.json();

    // Insertar el nuevo vuelo
    const result = await db.query(
      `INSERT INTO flights (
        flight_number,
        airline_id,
        aircraft_id,
        departure_airport_id,
        arrival_airport_id,
        departure_time,
        arrival_time,
        base_price,
        available_seats
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        flightData.flight_number,
        flightData.airline_id,
        flightData.aircraft_id,
        flightData.departure_airport_id,
        flightData.arrival_airport_id,
        flightData.departure_time,
        flightData.arrival_time,
        flightData.base_price,
        flightData.available_seats || 0
      ]
    ) as any;

    // Justo después de insertar el vuelo y antes de generar los asientos:
    let availableSeats = 0;

    if (flightData.aircraft_id && result.insertId) {
      const [aircraft] = await db.query(
        "SELECT total_seats FROM aircrafts WHERE id = ?",
        [flightData.aircraft_id]
      ) as any[];

      if (aircraft.length > 0) {
        const totalSeats = aircraft[0].total_seats;
        availableSeats = totalSeats;

        const seats = [];
        for (let i = 1; i <= totalSeats; i++) {
          seats.push([
            result.insertId,
            `${i}A`,
            'economy',
            true,
            1.0,
          ]);
        }

        await db.query(
          `INSERT INTO flight_seats (
        flight_id, seat_number, class, is_available, price_modifier
      ) VALUES ?`,
          [seats]
        );

        // Update available seats in the flight
        await db.query(
          `UPDATE flights SET available_seats = ? WHERE id = ?`,
          [availableSeats, result.insertId]
        );
      }
    }


    await db.end();
    return NextResponse.json(
      { message: "Vuelo creado exitosamente", id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    await db.end();
    return NextResponse.json(
      { message: "Error al crear el vuelo" },
      { status: 500 }
    );
  }
}