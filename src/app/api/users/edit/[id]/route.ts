import { NextResponse } from "next/server";
import db from "@/libs/mysql";
import bcrypt from "bcrypt";


export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { username, email, userpassword } = await request.json();

        const hashedPassword = await bcrypt.hash(userpassword, 10);

        const result = await db.query("UPDATE users SET username = ?, email = ?, userpassword = ? WHERE id = ?", [username, email, hashedPassword, id]);
        
        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        console.log(result);
        return NextResponse.json({ message: "User updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}