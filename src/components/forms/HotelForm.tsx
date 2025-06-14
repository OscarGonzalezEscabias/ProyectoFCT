"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function HotelForm() {
    const [namehotel, setNameHotel] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const form = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!namehotel || !description || !imageFile) {
            alert("Completa todos los campos.");
            return;
        }

        const formData = new FormData();
        formData.append("namehotel", namehotel);
        formData.append("description", description);
        formData.append("image", imageFile);

        try {
            const res = await axios.post("/api/hotels/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(res.data);
            form.current?.reset();
            router.push("/home/hotels");
        } catch (error) {
            console.error("Error al crear el hotel:", error);
            alert("Error al crear hotel.");
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <form onSubmit={handleSubmit} ref={form} className="flex flex-col gap-4 bg-white p-6 rounded-lg w-96">
            <label className="font-bold text-gray-700">Nombre del hotel</label>
            <input
                type="text"
                value={namehotel}
                onChange={(e) => setNameHotel(e.target.value)}
                className="border p-2 rounded"
                required
            />

            <label className="font-bold text-gray-700">Descripción</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded"
                required
            />

            <label className="font-bold text-gray-700">Imagen del hotel</label>
            <button
                type="button"
                onClick={triggerFileInput}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 w-fit"
            >
                Elegir archivo
            </button>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
                required
            />

            {imagePreview && (
                <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded border" />
            )}

            <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Crear Hotel
            </button>
        </form>
    );
}

export default HotelForm;
