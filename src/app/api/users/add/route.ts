import { NextResponse } from "next/server";
import db from "@/libs/mysql";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const { username, email, userpassword } = await request.json();

        if (!username || !email || !userpassword) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const userFound = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if ((userFound as any).length > 0) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(userpassword, 10);

        const result = await db.query(
            "INSERT INTO users (username, email, userpassword) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );

        console.log(result);

        return NextResponse.json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}