"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Hotel {
    namehotel: string;
    description: string;
    image: string;
}

function HotelForm() {
    const [hotel, setHotel] = useState<Hotel>({
        namehotel: "",
        description: "",
        image: "",
    });

    const router = useRouter();
    const form = useRef<HTMLFormElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setHotel((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!hotel.namehotel || !hotel.description || !hotel.image) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await axios.post("/api/hotels/add", hotel);
            console.log("Hotel creado:", response.data);
            form.current?.reset();
            router.push("/home/admin/hotels");
        } catch (error) {
            console.error("Error al crear el hotel:", error);
            alert("No se pudo crear el hotel.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            ref={form}
            className="flex flex-col gap-4 bg-white p-6 rounded-lg w-96"
        >
            <label htmlFor="namehotel" className="text-gray-700 font-bold">
                Nombre del hotel
            </label>
            <input
                type="text"
                name="namehotel"
                id="namehotel"
                value={hotel.namehotel}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2"
                required
            />

            <label htmlFor="description" className="text-gray-700 font-bold">
                Descripción
            </label>
            <textarea
                name="description"
                id="description"
                value={hotel.description}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2"
                required
            ></textarea>

            <label htmlFor="image" className="text-gray-700 font-bold">
                Imagen (nombre de archivo o URL)
            </label>
            <input
                type="text"
                name="image"
                id="image"
                value={hotel.image}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2"
                required
            />

            <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
                Crear Hotel
            </button>
        </form>
    );
}

export default HotelForm;
