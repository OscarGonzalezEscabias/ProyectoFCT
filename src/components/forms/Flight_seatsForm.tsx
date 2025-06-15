"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

interface FlightSeat {
  flight_id: number;
  seat_number: string;
  class: "economy" | "premium_economy" | "business" | "first";
  is_available: boolean;
  price_modifier: number;
}

interface Flight {
  id: number;
  flight_number: string;
}

function FlightSeatsForm() {
  const [flightSeat, setFlightSeat] = useState<FlightSeat>({
    flight_id: 0,
    seat_number: "",
    class: "economy",
    is_available: true,
    price_modifier: 1.0,
  });

  const [flights, setFlights] = useState<Flight[]>([]);

  const router = useRouter();
  const { id } = useParams();
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Cargar vuelos
    axios
      .get("/api/flights")
      .then((res) => setFlights(res.data))
      .catch((err) => console.error("Error cargando vuelos:", err));

    // Si se está editando un asiento, cargar sus datos
    if (id) {
      axios
        .get(`/api/flight_seats/${id}`)
        .then((res) => setFlightSeat(res.data))
        .catch((err) => {
          console.error("Error cargando el asiento:", err);
          alert("No se pudo cargar el asiento.");
        });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFlightSeat((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : name === "is_available"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !flightSeat.flight_id ||
      !flightSeat.seat_number ||
      !flightSeat.class ||
      isNaN(flightSeat.price_modifier)
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      if (id) {
        await axios.put(`/api/flight_seats/edit/${id}`, flightSeat);
      } else {
        await axios.post("/api/flight_seats/add", flightSeat);
      }
      form.current?.reset();
      router.push("/home/admin/flight_seats");
    } catch (error) {
      console.error("Error al guardar el asiento:", error);
      alert("No se pudo guardar el asiento.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={form}
      className="flex flex-col gap-4 bg-white p-6 rounded-lg w-96"
    >
      <label htmlFor="flight_id" className="text-gray-700 font-bold">
        Vuelo
      </label>
      <select
        name="flight_id"
        id="flight_id"
        value={flightSeat.flight_id}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        required
      >
        <option value={0} disabled>
          Selecciona un vuelo
        </option>
        {flights.map((flight) => (
          <option key={flight.id} value={flight.id}>
            {flight.flight_number}
          </option>
        ))}
      </select>

      <label htmlFor="seat_number" className="text-gray-700 font-bold">
        Número del Asiento
      </label>
      <input
        type="text"
        name="seat_number"
        id="seat_number"
        value={flightSeat.seat_number}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        required
      />

      <label htmlFor="class" className="text-gray-700 font-bold">
        Clase
      </label>
      <select
        name="class"
        id="class"
        value={flightSeat.class}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        required
      >
        <option value="economy">Economy</option>
        <option value="premium_economy">Premium Economy</option>
        <option value="business">Business</option>
        <option value="first">First</option>
      </select>

      <label className="text-gray-700 font-bold flex items-center gap-2">
        <input
          type="checkbox"
          name="is_available"
          checked={flightSeat.is_available}
          onChange={handleChange}
          className="w-4 h-4"
        />
        Disponible
      </label>

      <label htmlFor="price_modifier" className="text-gray-700 font-bold">
        Modificador de Precio
      </label>
      <input
        type="number"
        name="price_modifier"
        id="price_modifier"
        step="0.01"
        min="0.1"
        value={flightSeat.price_modifier}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        {id ? "Actualizar Asiento" : "Crear Asiento"}
      </button>
    </form>
  );
}

export default FlightSeatsForm;
