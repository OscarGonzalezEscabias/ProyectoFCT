import { NextResponse } from "next/server";
import db from "@/libs/mysql";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const { types, name, description, image, price, available } = await request.json();

        const result = await db.query(
            "INSERT INTO activities (types, name, description, image, price, available) VALUES (?, ?, ?, ?, ?, ?)",
            [types, name, description, image, price, available]
        );

        console.log(result);

        return NextResponse.json({ message: "Activities created successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create activities" }, { status: 500 });
    }
}