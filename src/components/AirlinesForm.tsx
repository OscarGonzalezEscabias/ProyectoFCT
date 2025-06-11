"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

interface Airline {
  name: string;
  iata_code: string;
  logo_url?: string;
}

function AirlinesForm() {
  const [airline, setAirline] = useState<Airline>({
    name: "",
    iata_code: "",
    logo_url: "",
  });

  const router = useRouter();
  const { id } = useParams(); // Detecta si hay id para editar
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/airlines/${id}`)
        .then((res) => setAirline(res.data))
        .catch((err) => {
          console.error("Error cargando la aerolínea:", err);
          alert("No se pudo cargar la aerolínea.");
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAirline((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!airline.name || !airline.iata_code) {
      alert("Por favor, completa los campos obligatorios (nombre e IATA).");
      return;
    }

    try {
      if (id) {
        await axios.put(`/api/airlines/edit/${id}`, airline);
      } else {
        await axios.post("/api/airlines/add", airline);
      }
      form.current?.reset();
      router.push("/home/airlines");
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

      <label htmlFor="logo_url" className="text-gray-700 font-bold">
        URL del logo (opcional)
      </label>
      <input
        type="text"
        name="logo_url"
        id="logo_url"
        value={airline.logo_url}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        placeholder="https://example.com/logo.png"
      />

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
