"use client";

import { useEffect, useState } from "react";
import Buttons from "../../app/home/admin/flight_seats/[id]/Buttons";

function FlightSeatsCard({ flight_seatss }: { flight_seatss: any }) {
  const [flightNumber, setFlightNumber] = useState<string>("");

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await fetch(`/api/flights/${flight_seatss.flight_id}`);
        const data = await res.json();
        setFlightNumber(data.flight_number);
      } catch (error) {
        console.error("Error al cargar el número de vuelo:", error);
        setFlightNumber(`ID ${flight_seatss.flight_id}`);
      }
    };

    if (flight_seatss.flight_id) {
      fetchFlight();
    }
  }, [flight_seatss.flight_id]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-2">
        <h2 className="font-bold text-xl">Asiento {flight_seatss.seat_number}</h2>
      </div>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Vuelo:</span>{" "}
        {flightNumber || "Cargando..."}
      </p>

      <p className="text-gray-700 mb-1 capitalize">
        <span className="font-semibold">Clase:</span> {flight_seatss.class}
      </p>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Disponible:</span>{" "}
        {flight_seatss.is_available ? "Sí" : "No"}
      </p>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Multiplicador de precio:</span>{" "}
        {flight_seatss.price_modifier}
      </p>

      <div className="border-t border-gray-200 pt-4">
        <Buttons id={flight_seatss.id} />
      </div>
    </div>
  );
}

export default FlightSeatsCard;
