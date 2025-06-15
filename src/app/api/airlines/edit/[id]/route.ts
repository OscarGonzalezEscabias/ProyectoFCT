import { NextResponse } from "next/server";
import db from "@/libs/mysql";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const iata_code = formData.get("iata_code") as string;
    const file = formData.get("logo") as File | null;
    let existing_logo_url = formData.get("existing_logo_url") as string;

    let logo_url = existing_logo_url || "";

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${uuidv4()}-${file.name}`;

      const dir = path.join(process.cwd(), "public/images/airlines");
      await mkdir(dir, { recursive: true });
      const filePath = path.join(dir, fileName);

      await writeFile(filePath, buffer);

      // Solo guardamos el nombre del archivo, no la ruta completa
      logo_url = fileName;
    }

    const result = await db.query(
      "UPDATE airlines SET name = ?, iata_code = ?, logo_url = ? WHERE id = ?",
      [name, iata_code, logo_url, id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Airline not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Airline updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update airline" }, { status: 500 });
  }
}
