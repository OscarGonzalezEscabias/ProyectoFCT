import { NextResponse } from "next/server";
import db from "@/libs/mysql";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const { user_id, activity_id, total_price, initial_date, final_date } = await request.json();

        const result = await db.query(
            "INSERT INTO activity_reservations (user_id, activity_id, total_price, initial_date, final_date) VALUES (?, ?, ?, ?, ?)",
            [user_id, activity_id, total_price, initial_date, final_date]
        );

        console.log(result);

        return NextResponse.json({ message: "activity_reservations created successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create activity_reservations" }, { status: 500 });
    }
}