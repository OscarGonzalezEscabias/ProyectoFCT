import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function GET() {
  try {
    const results = await db.query(`
      SELECT f.*, 
        a.name as airline_name,
        dep.name as departure_airport_name, dep.city as departure_city,
        arr.name as arrival_airport_name, arr.city as arrival_city
      FROM flights f
      JOIN airlines a ON f.airline_id = a.id
      JOIN airports dep ON f.departure_airport_id = dep.id
      JOIN airports arr ON f.arrival_airport_id = arr.id
    `);
    await db.end();
    return NextResponse.json(results);
  } catch (error) {
    await db.end();
    return NextResponse.json(
      { message: "Error fetching flights" },
      { status: 500 }
    );
  }
}