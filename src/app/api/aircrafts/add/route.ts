import { NextResponse } from "next/server";
import db from "@/libs/mysql";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const { model, airline_id, total_seats } = await request.json();

        const result = await db.query(
            "INSERT INTO aircrafts (model, airline_id, total_seats) VALUES (?, ?, ?)",
            [model, airline_id, total_seats]
        );

        console.log(result);

        return NextResponse.json({ message: "Aircraft created successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create aircraft" }, { status: 500 });
    }
}