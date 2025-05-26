import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const results = await db.query(`
      SELECT f.*, 
        a.name as airline_name, a.iata_code as airline_code,
        dep.name as departure_airport_name, dep.city as departure_city, dep.iata_code as departure_code,
        arr.name as arrival_airport_name, arr.city as arrival_city, arr.iata_code as arrival_code,
        ac.model as aircraft_model
      FROM flights f
      JOIN airlines a ON f.airline_id = a.id
      JOIN airports dep ON f.departure_airport_id = dep.id
      JOIN airports arr ON f.arrival_airport_id = arr.id
      JOIN aircrafts ac ON f.aircraft_id = ac.id
      WHERE f.id = ?
    `, [params.id]) as any[];
    await db.end();
    
    if (results.length === 0) {
      return NextResponse.json({ message: "Flight not found" }, { status: 404 });
    }
    
    return NextResponse.json(results[0]);
  } catch (error) {
    await db.end();
    return NextResponse.json(
      { message: "Error fetching flight" },
      { status: 500 }
    );
  }
}