import { NextResponse } from "next/server";
import db from "@/libs/mysql";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const iata_code = formData.get("iata_code") as string;
    const file = formData.get("logo") as File | null;

    let logo_url = "";
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${uuidv4()}-${file.name}`;

      // Carpeta donde guardaremos la imagen
      const dir = path.join(process.cwd(), "public/images/airlines");

      // Crear carpeta si no existe
      await mkdir(dir, { recursive: true });

      // Ruta completa del archivo
      const filePath = path.join(dir, fileName);

      await writeFile(filePath, buffer);

      // Guardamos SOLO el nombre del archivo en la base de datos
      logo_url = fileName;
    }

    await db.query(
      "INSERT INTO airlines (name, iata_code, logo_url) VALUES (?, ?, ?)",
      [name, iata_code, logo_url]
    );

    return NextResponse.json({ message: "Airline created successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create airline" }, { status: 500 });
  }
}
