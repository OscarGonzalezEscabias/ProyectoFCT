"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Activity {
  types: "RENTING" | "RESERVATION";
  name: string;
  description: string;
  image: string;
  price: number;
  available: boolean;
}

function ActivitiesForm() {
  const [activity, setActivity] = useState<Activity>({
    types: "RENTING",
    name: "",
    description: "",
    image: "",
    price: 0,
    available: true,
  });

  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === "available") {
      setActivity((prev) => ({
        ...prev,
        available: (e.target as HTMLInputElement).checked,
      }));
    } else if (name === "price") {
      setActivity((prev) => ({
        ...prev,
        price: parseFloat(value),
      }));
    } else {
      setActivity((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { types, name, description, image, price } = activity;

    if (!types || !name || !description || !image || !price) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      const response = await axios.post("/api/activities/add", activity);
      console.log("Actividad creada:", response.data);
      form.current?.reset();
      router.push("/home/activities");
    } catch (error) {
      console.error("Error al crear la actividad:", error);
      alert("No se pudo crear la actividad.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={form}
      className="flex flex-col gap-4 bg-white p-6 rounded-lg w-96"
    >
      <label htmlFor="types" className="text-gray-700 font-bold">
        Tipo de actividad
      </label>
      <select
        name="types"
        id="types"
        value={activity.types}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        required
      >
        <option value="RENTING">RENTING</option>
        <option value="RESERVATION">RESERVATION</option>
      </select>

      <label htmlFor="name" className="text-gray-700 font-bold">
        Nombre
      </label>
      <input
        type="text"
        name="name"
        id="name"
        value={activity.name}
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
        value={activity.description}
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
        value={activity.image}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        required
      />

      <label htmlFor="price" className="text-gray-700 font-bold">
        Precio (€)
      </label>
      <input
        type="number"
        name="price"
        id="price"
        value={activity.price}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        step="0.01"
        min="0"
        required
      />

      <label htmlFor="available" className="text-gray-700 font-bold flex items-center gap-2">
        <input
          type="checkbox"
          name="available"
          id="available"
          checked={activity.available}
          onChange={handleChange}
        />
        Disponible
      </label>

      <button
        type="submit"
        className="bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Crear Actividad
      </button>
    </form>
  );
}

export default ActivitiesForm;
