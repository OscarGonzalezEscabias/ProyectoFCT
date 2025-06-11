"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

interface Airport {
  iata_code: string;
  name: string;
  city: string;
  country: string;
}

function AirportForm() {
  const [airport, setAirport] = useState<Airport>({
    iata_code: "",
    name: "",
    city: "",
    country: "",
  });

  const router = useRouter();
  const { id } = useParams(); // Detecta si hay id → editar
  const form = useRef<HTMLFormElement>(null);

  // Si hay id, cargamos datos del aeropuerto para editar
  useEffect(() => {
    if (id) {
      axios
        .get(`/api/airports/${id}`)
        .then((res) => setAirport(res.data))
        .catch((err) => {
          console.error("Error cargando el aeropuerto:", err);
          alert("No se pudo cargar el aeropuerto.");
        });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setAirport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación simple
    if (!airport.iata_code || !airport.name || !airport.city || !airport.country) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      if (id) {
        await axios.put(`/api/airports/edit/${id}`, airport);
      } else {
        await axios.post("/api/airports/add", airport);
      }

      form.current?.reset();
      router.push("/home/airports");
    } catch (error) {
      console.error("Error al guardar el aeropuerto:", error);
      alert("No se pudo guardar el aeropuerto.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={form}
      className="flex flex-col gap-4 bg-white p-6 rounded-lg w-96"
    >
      <label htmlFor="iata_code" className="text-gray-700 font-bold">
        Código IATA
      </label>
      <input
        type="text"
        name="iata_code"
        id="iata_code"
        value={airport.iata_code}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        maxLength={3}
        required
      />

      <label htmlFor="name" className="text-gray-700 font-bold">
        Nombre del aeropuerto
      </label>
      <input
        type="text"
        name="name"
        id="name"
        value={airport.name}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        required
      />

      <label htmlFor="city" className="text-gray-700 font-bold">
        Ciudad
      </label>
      <input
        type="text"
        name="city"
        id="city"
        value={airport.city}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        required
      />

      <label htmlFor="country" className="text-gray-700 font-bold">
        País
      </label>
      <input
        type="text"
        name="country"
        id="country"
        value={airport.country}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        {id ? "Actualizar Aeropuerto" : "Crear Aeropuerto"}
      </button>
    </form>
  );
}

export default AirportForm;
