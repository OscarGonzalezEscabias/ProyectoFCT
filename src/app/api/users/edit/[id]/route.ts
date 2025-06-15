import { NextResponse } from "next/server";
import db from "@/libs/mysql";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const formData = await request.formData();

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const userpassword = formData.get("userpassword") as string;
    const file = formData.get("image") as File | null;
    const existingImage = formData.get("existingImage") as string;

    let imageFilename = existingImage || "";

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${uuidv4()}-${file.name}`;

      const dir = path.join(process.cwd(), "public/images/users");
      await mkdir(dir, { recursive: true });
      const filePath = path.join(dir, fileName);

      await writeFile(filePath, buffer);

      imageFilename = fileName;
    }

    const hashedPassword = await bcrypt.hash(userpassword, 10);

    const result = await db.query(
      "UPDATE users SET username = ?, email = ?, userpassword = ?, image = ? WHERE id = ?",
      [username, email, hashedPassword, imageFilename, id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
