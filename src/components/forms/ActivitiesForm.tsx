"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function ActivitiesForm() {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activityData, setActivityData] = useState({
    types: "RENTING",
    name: "",
    description: "",
    price: 0,
    available: true,
  });

  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "available") {
      setActivityData({ ...activityData, available: (e.target as HTMLInputElement).checked });
    } else if (name === "price") {
      setActivityData({ ...activityData, price: parseFloat(value) });
    } else {
      setActivityData({ ...activityData, [name]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert("Por favor selecciona una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    Object.entries(activityData).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    try {
      await axios.post("/api/activities/add", formData);
      form.current?.reset();
      router.push("/home/activities");
    } catch (error) {
      console.error(error);
      alert("No se pudo crear la actividad.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={form}
      className="flex flex-col gap-4 bg-white p-6 rounded-lg w-96"
    >
      <label className="font-bold text-gray-700">Tipo de actividad</label>
      <select
        name="types"
        value={activityData.types}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      >
        <option value="RENTING">RENTING</option>
        <option value="RESERVATION">RESERVATION</option>
      </select>

      <label className="font-bold text-gray-700">Nombre de la actividad</label>
      <input
        type="text"
        name="name"
        value={activityData.name}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />

      <label className="font-bold text-gray-700">Descripción</label>
      <textarea
        name="description"
        value={activityData.description}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />

      <label className="font-bold text-gray-700">Precio (€)</label>
      <input
        type="number"
        name="price"
        value={activityData.price}
        onChange={handleChange}
        className="border p-2 rounded"
        min="0"
        step="0.01"
        required
      />

      <label className="font-bold text-gray-700">Imagen de la actividad</label>
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
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
        required
      />

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="w-full h-48 object-cover rounded border"
        />
      )}

      <label className="flex items-center gap-2 font-bold text-gray-700">
        <input
          type="checkbox"
          name="available"
          checked={activityData.available}
          onChange={handleChange}
        />
        Disponible
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Crear Actividad
      </button>
    </form>
  );
}

export default ActivitiesForm;
