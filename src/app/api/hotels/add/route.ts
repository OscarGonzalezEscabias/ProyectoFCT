import { NextResponse } from "next/server";
import db from "@/libs/mysql";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const { namehotel, description, image } = await request.json();

        const result = await db.query(
            "INSERT INTO hotel (namehotel, description, image) VALUES (?, ?, ?)",
            [namehotel, description, image]
        );

        console.log(result);

        return NextResponse.json({ message: "Hotel created successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create hotel" }, { status: 500 });
    }
}