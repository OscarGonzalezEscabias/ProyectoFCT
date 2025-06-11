import { NextResponse } from "next/server";
import db from "@/libs/mysql";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const { name, hotel_id, description, capacity, price, image } = await request.json();

        const result = await db.query(
            "INSERT INTO rooms (name, hotel_id, description, capacity, price, image) VALUES (?, ?, ?, ?, ?, ?)",
            [name, hotel_id, description, capacity, price, image]
        );

        console.log(result);

        return NextResponse.json({ message: "Room created successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create room" }, { status: 500 });
    }
}