"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

interface Airline {
  name: string;
  iata_code: string;
  logo_url: string; // URL completa, por ejemplo "/images/uuid-nombre.jpg"
}

function AirlinesForm() {
  const [airline, setAirline] = useState<Airline>({
    name: "",
    iata_code: "",
    logo_url: "",
  });

  const [preview, setPreview] = useState<string>("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/airlines/${id}`)
        .then((res) => {
          setAirline(res.data);
          if (res.data.logo_url) {
            setPreview(`/images/airlines/${res.data.logo_url}`); // Aquí la URL ya está completa
          }
        })
        .catch((err) => {
          console.error("Error cargando la aerolínea:", err);
          alert("No se pudo cargar la aerolínea.");
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAirline((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Liberar URL para evitar memory leaks
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!airline.name || !airline.iata_code) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", airline.name);
      formData.append("iata_code", airline.iata_code);

      if (selectedFile) {
        formData.append("logo", selectedFile);
      }

      if (id) {
        formData.append("existing_logo_url", airline.logo_url); // Nombre clave correcto para el backend
        await axios.put(`/api/airlines/edit/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("/api/airlines/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      form.current?.reset();
      router.push("/home/admin/airlines");
    } catch (error) {
      console.error("Error al guardar la aerolínea:", error);
      alert("No se pudo guardar la aerolínea.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={form}
      className="flex flex-col gap-4 bg-white p-6 rounded-lg w-96"
    >
      <label htmlFor="name" className="text-gray-700 font-bold">
        Nombre de la aerolínea
      </label>
      <input
        type="text"
        name="name"
        id="name"
        value={airline.name}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        required
      />

      <label htmlFor="iata_code" className="text-gray-700 font-bold">
        Código IATA (2 letras)
      </label>
      <input
        type="text"
        name="iata_code"
        id="iata_code"
        value={airline.iata_code}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        maxLength={2}
        required
      />

      <label htmlFor="logo" className="text-gray-700 font-bold">
        Logo de la aerolínea
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
        name="logo"
        id="logo"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview logo"
          className="w-full h-48 object-cover rounded border mt-2"
        />
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        {id ? "Actualizar Aerolínea" : "Crear Aerolínea"}
      </button>
    </form>
  );
}

export default AirlinesForm;
