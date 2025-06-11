import { NextResponse } from "next/server";
import db from "@/libs/mysql";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const { name, iata_code, logo_url } = await request.json();

        const result = await db.query(
            "INSERT INTO airlines (name, iata_code, logo_url) VALUES (?, ?, ?)",
            [name, iata_code, logo_url]
        );

        console.log(result);

        return NextResponse.json({ message: "Airline created successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create airline" }, { status: 500 });
    }
}