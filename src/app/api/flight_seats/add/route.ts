import { NextResponse } from "next/server";
import db from "@/libs/mysql";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const { flight_id, seat_number, class: seatClass, is_available, price_modifier } = await request.json();

        const result = await db.query(
            "INSERT INTO flight_seats (flight_id, seat_number, class, is_available, price_modifier) VALUES (?, ?, ?, ?, ?)",
            [flight_id, seat_number, seatClass, is_available, price_modifier]
        );

        console.log(result);

        return NextResponse.json({ message: "Aircraft created successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create aircraft" }, { status: 500 });
    }
}