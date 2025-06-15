import { NextResponse } from "next/server";
import db from "@/libs/mysql";
import bcrypt from "bcrypt";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const userpassword = formData.get("userpassword") as string;
    const file = formData.get("image") as File | null;

    if (!username || !email || !userpassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verificamos si el usuario ya existe
    const userFound = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if ((userFound as any).length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Guardar la imagen si se ha enviado
    let imageFilename = "";
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

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(userpassword, 10);

    // Insertar usuario
    const result = await db.query(
      "INSERT INTO users (username, email, userpassword, image) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, imageFilename]
    );

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
