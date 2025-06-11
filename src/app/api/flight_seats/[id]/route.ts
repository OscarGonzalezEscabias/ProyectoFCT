import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const results = await db.query("SELECT * FROM flight_seats WHERE id = ?", [params.id]);
    await db.end();
    
    if ((results as any).length === 0) {
      return NextResponse.json({ message: "flight seats not found" }, { status: 404 });
    }
    
    return NextResponse.json((results as any)[0]);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching flight seats" },
      { status: 500 }
    );
  }
}