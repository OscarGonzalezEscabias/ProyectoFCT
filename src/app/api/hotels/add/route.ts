import { NextRequest, NextResponse } from "next/server";
import db from "@/libs/mysql";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const namehotel = formData.get("namehotel") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File;

    if (!file || !namehotel || !description) {
        return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = uuidv4() + path.extname(file.name);
    const uploadDir = path.join(process.cwd(), "public", "uploads", "hotels");

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, fileName), buffer);

    const result = await db.query(
        "INSERT INTO hotel (namehotel, description, image) VALUES (?, ?, ?)",
        [namehotel, description, fileName]
    );

    return NextResponse.json({ message: "Hotel creado correctamente", result });
}
