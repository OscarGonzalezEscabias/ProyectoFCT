import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function POST(request) {
    try {
        const { username, email, userpassword } = await request.json();

        const result = await db.query(
            "INSERT INTO users (username, email, userpassword) VALUES (?, ?, ?)",
            [username, email, userpassword]
        );

        console.log(result);

        return NextResponse.json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}