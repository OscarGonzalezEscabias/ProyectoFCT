import { NextResponse } from "next/server";
import db from "@/libs/mysql";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const { iata_code, name, city, country } = await request.json();

        const result = await db.query(
            "INSERT INTO airports (iata_code, name, city, country) VALUES (?, ?, ?, ?)",
            [iata_code, name, city, country]
        );

        console.log(result);

        return NextResponse.json({ message: "Airport created successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create airport" }, { status: 500 });
    }
}