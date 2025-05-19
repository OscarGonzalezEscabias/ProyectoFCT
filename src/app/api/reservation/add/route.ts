import { NextResponse } from "next/server";
import db from "@/libs/mysql";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const { user_id, room_id, check_in, check_out, total_price } = await request.json();

        const result = await db.query(
            "INSERT INTO reservation (user_id, room_id, check_in, check_out, total_price) VALUES (?, ?, ?, ?, ?)",
            [user_id, room_id, check_in, check_out, total_price]
        );

        console.log(result);

        return NextResponse.json({ message: "Reservation created successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 });
    }
}