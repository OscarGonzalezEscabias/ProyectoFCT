"use client";

import { useEffect, useState } from "react";
import Buttons from "../../app/home/admin/aircrafts/[id]/Buttons";
import axios from "axios";

interface Airline {
  id: number;
  name: string;
}

function AircraftsCard({ aircrafts }: { aircrafts: any }) {
  const [airlines, setAirlines] = useState<Airline[]>([]);

  useEffect(() => {
    axios
      .get("/api/airlines")
      .then((res) => setAirlines(res.data))
      .catch((err) => console.error("Error cargando aerolíneas:", err));
  }, []);

  const airlineName =
    airlines.find((a) => a.id === aircrafts.airline_id)?.name || "Desconocida";

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-2">
        <h2 className="font-bold text-xl">{aircrafts.model}</h2>
      </div>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Aerolínea:</span> {airlineName}
      </p>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Asientos:</span> {aircrafts.total_seats}
      </p>

      <div className="border-t border-gray-200 pt-4">
        <Buttons id={aircrafts.id} />
      </div>
    </div>
  );
}

export default AircraftsCard;
