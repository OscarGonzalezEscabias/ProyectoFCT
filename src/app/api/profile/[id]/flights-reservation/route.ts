import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function GET(request: Request, context: { params: { id: string } }) {
  try {
    const id = context.params.id;
    const result = await db.query("SELECT * FROM flight_reservations WHERE user_id = ?", [id]);

    if ((result as any).length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch flights" }, { status: 500 });
  }
}
