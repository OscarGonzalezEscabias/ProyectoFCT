import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const result = await db.query("DELETE FROM users WHERE id = ?", [id]);
        
        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        console.log(result);
        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}