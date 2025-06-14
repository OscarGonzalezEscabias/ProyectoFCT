import { NextResponse } from "next/server";
import db from "@/libs/mysql";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Content-Type debe ser multipart/form-data" }, { status: 400 });
    }

    const formData = await request.formData();

    const name = formData.get("name")?.toString() || "";
    const hotel_id = Number(formData.get("hotel_id") || 0);
    const description = formData.get("description")?.toString() || "";
    const capacity = Number(formData.get("capacity") || 0);
    const price = Number(formData.get("price") || 0);
    const imageFile = formData.get("image") as File | null;
    const currentImage = formData.get("currentImage")?.toString() || "";

    if (!name || !hotel_id || !description || !capacity || !price) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    let imageName = currentImage;

    if (imageFile && imageFile.size > 0) {
      // Borrar imagen anterior si existe
      if (currentImage) {
        const oldImagePath = path.join(process.cwd(), "public", "images", "rooms", currentImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const ext = path.extname(imageFile.name);
      imageName = uuidv4() + ext;

      const imagesDir = path.join(process.cwd(), "public", "images", "rooms");
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
      }
      fs.writeFileSync(path.join(imagesDir, imageName), buffer);
    }

    const result = await db.query(
      "UPDATE rooms SET name = ?, hotel_id = ?, description = ?, capacity = ?, price = ?, image = ? WHERE id = ?",
      [name, hotel_id, description, capacity, price, imageName, id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Room updated successfully" });
  } catch (error) {
    console.error("Error PUT /api/rooms/edit/[id]:", error);
    return NextResponse.json({ error: "Failed to update room" }, { status: 500 });
  }
}
