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
  image: string; // nombre archivo
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

  const [preview, setPreview] = useState<string>("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { id } = useParams();
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/rooms/${id}`)
        .then((res) => {
          setRoom(res.data);
          if (res.data.image) {
            setPreview(`/images/rooms/${res.data.image}`);
          }
        })
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // liberar URL para evitar memory leak
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !room.name ||
      !room.description ||
      !room.capacity ||
      !room.price ||
      !room.hotel_id
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", room.name);
      formData.append("description", room.description);
      formData.append("capacity", room.capacity.toString());
      formData.append("price", room.price.toString());
      formData.append("hotel_id", room.hotel_id.toString());

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      // Para edición enviamos la imagen actual también (en caso de no cambiar)
      if (id) {
        formData.append("currentImage", room.image);
        await axios.put(`/api/rooms/edit/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("/api/rooms/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      form.current?.reset();
      router.push("/home/admin/rooms");
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
        Imagen de la habitación
      </label>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 w-fit"
      >
        Elegir archivo
      </button>
      <input
        type="file"
        name="image"
        id="image"
        onChange={handleFileChange}
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-48 object-cover rounded border mt-2"
        />
      )}

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
