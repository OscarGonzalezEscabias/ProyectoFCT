import { NextResponse } from "next/server";
import db from "@/libs/mysql";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const image = formData.get("image") as File | null;
    if (!image) throw new Error("No se recibió la imagen.");

    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = `${Date.now()}_${image.name}`;
    const imagesDir = path.join(process.cwd(), "public/images/activities");

    // Crear carpeta si no existe
    await mkdir(imagesDir, { recursive: true });

    const filepath = path.join(imagesDir, filename);
    await writeFile(filepath, buffer);

    const types = formData.get("types") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const priceRaw = formData.get("price");
    const price = priceRaw ? parseFloat(priceRaw as string) : NaN;
    const available = formData.get("available") === "true";

    if (!types || !name || !description || isNaN(price)) {
      throw new Error("Datos incompletos o inválidos.");
    }

    await db.query(
      "INSERT INTO activities (types, name, description, image, price, available) VALUES (?, ?, ?, ?, ?, ?)",
      [types, name, description, filename, price, available]
    );

    return NextResponse.json({ message: "Actividad creada correctamente" });
  } catch (error) {
    console.error("Error en API /activities/add:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Error interno" },
      { status: 500 }
    );
  }
}
