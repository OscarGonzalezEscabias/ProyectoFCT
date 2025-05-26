import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const results = await db.query(
      "SELECT * FROM flight_seats WHERE flight_id = ?",
      [params.id]
    );
    await db.end();
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching seats" },
      { status: 500 }
    );
  }
}