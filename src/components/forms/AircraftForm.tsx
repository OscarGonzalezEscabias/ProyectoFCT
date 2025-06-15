"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

interface Aircraft {
  model: string;
  airline_id: number;
  total_seats: number;
}

interface Airline {
  id: number;
  name: string;
}

function AircraftForm() {
  const [aircraft, setAircraft] = useState<Aircraft>({
    model: "",
    airline_id: 0,
    total_seats: 0,
  });

  const [airlines, setAirlines] = useState<Airline[]>([]);
  const router = useRouter();
  const { id } = useParams();
  const form = useRef<HTMLFormElement>(null);

  // Cargar aerolíneas y datos del avión si hay ID
  useEffect(() => {
    axios
      .get("/api/airlines")
      .then((res) => setAirlines(res.data))
      .catch((err) => console.error("Error cargando aerolíneas:", err));

    if (id) {
      axios
        .get(`/api/aircrafts/${id}`)
        .then((res) => setAircraft(res.data))
        .catch((err) => {
          console.error("Error cargando el avión:", err);
          alert("No se pudo cargar el avión.");
        });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setAircraft((prev) => ({
      ...prev,
      [name]: name === "airline_id" || name === "total_seats" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!aircraft.model || !aircraft.airline_id || !aircraft.total_seats) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      if (id) {
        await axios.put(`/api/aircrafts/edit/${id}`, aircraft);
      } else {
        await axios.post("/api/aircrafts/add", aircraft);
      }

      form.current?.reset();
      router.push("/home/admin/aircrafts");
    } catch (error) {
      console.error("Error al guardar el avión:", error);
      alert("No se pudo guardar el avión.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={form}
      className="flex flex-col gap-4 bg-white p-6 rounded-lg w-96"
    >
      <label htmlFor="model" className="text-gray-700 font-bold">
        Modelo
      </label>
      <input
        type="text"
        name="model"
        id="model"
        value={aircraft.model}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        required
      />

      <label htmlFor="airline_id" className="text-gray-700 font-bold">
        Aerolínea
      </label>
      <select
        name="airline_id"
        id="airline_id"
        value={aircraft.airline_id}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        required
      >
        <option value={0} disabled>
          Selecciona una aerolínea
        </option>
        {airlines.map((airline) => (
          <option key={airline.id} value={airline.id}>
            {airline.name}
          </option>
        ))}
      </select>

      <label htmlFor="total_seats" className="text-gray-700 font-bold">
        Total de Asientos
      </label>
      <input
        type="number"
        name="total_seats"
        id="total_seats"
        value={aircraft.total_seats}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        min={1}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        {id ? "Actualizar Avión" : "Crear Avión"}
      </button>
    </form>
  );
}

export default AircraftForm;
