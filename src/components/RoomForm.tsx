"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

interface Room {
  name: string;
  description: string;
  capacity: number;
  price: number;
  hotel_id: number;
  image: string;
}

function RoomForm() {
  const [room, setRoom] = useState<Room>({
    name: "",
    description: "",
    capacity: 1,
    price: 0,
    hotel_id: 1,
    image: "",
  });

  const router = useRouter();
  const { id } = useParams(); // Detecta si hay id → editar
  const form = useRef<HTMLFormElement>(null);

  // Si hay id, cargamos datos de la habitación para editar
  useEffect(() => {
    if (id) {
      axios
        .get(`/api/rooms/${id}`)
        .then((res) => setRoom(res.data))
        .catch((err) => {
          console.error("Error cargando la habitación:", err);
          alert("No se pudo cargar la habitación.");
        });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setRoom((prev) => ({
      ...prev,
      [name]:
        name === "capacity" || name === "price" || name === "hotel_id"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!room.name || !room.description || !room.capacity || !room.price || !room.hotel_id) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      if (id) {
        await axios.put(`/api/rooms/edit/${id}`, room);
      } else {
        await axios.post("/api/rooms/add", room);
      }

      form.current?.reset();
      router.push("/home/rooms");
    } catch (error) {
      console.error("Error al guardar la habitación:", error);
      alert("No se pudo guardar la habitación.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={form}
      className="flex flex-col gap-4 bg-white p-6 rounded-lg w-96"
    >
      <label htmlFor="name" className="text-gray-700 font-bold">
        Nombre de la habitación
      </label>
      <input
        type="text"
        name="name"
        id="name"
        value={room.name}
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
        value={room.description}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        required
      />

      <label htmlFor="capacity" className="text-gray-700 font-bold">
        Capacidad
      </label>
      <input
        type="number"
        name="capacity"
        id="capacity"
        value={room.capacity}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        min={1}
        required
      />

      <label htmlFor="price" className="text-gray-700 font-bold">
        Precio (€)
      </label>
      <input
        type="number"
        step="0.01"
        name="price"
        id="price"
        value={room.price}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        min={0}
        required
      />

      <label htmlFor="hotel_id" className="text-gray-700 font-bold">
        ID del Hotel
      </label>
      <input
        type="number"
        name="hotel_id"
        id="hotel_id"
        value={room.hotel_id}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        min={1}
        required
      />

      <label htmlFor="image" className="text-gray-700 font-bold">
        Imagen (opcional)
      </label>
      <input
        type="text"
        name="image"
        id="image"
        value={room.image}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        placeholder="Nombre de archivo o URL"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        {id ? "Actualizar Habitación" : "Crear Habitación"}
      </button>
    </form>
  );
}

export default RoomForm;
