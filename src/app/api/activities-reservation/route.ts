import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function GET() {
  try {
    const results = await db.query("SELECT * FROM activity_reservations");
    await db.end();
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching activity_reservations" },
      { status: 500 }
    );
  }
}