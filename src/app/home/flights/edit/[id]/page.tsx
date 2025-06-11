"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import FlightForm from "@/components/FlightForm";

export default function EditFlightPage() {
  const router = useRouter();
  const params = useParams();
  const [flight, setFlight] = useState<any>(null);

  useEffect(() => {
    async function fetchFlight() {
      try {
        const response = await fetch(`/api/flights/edit/${params.id}`);
        if (!response.ok) throw new Error("Error al cargar vuelo");
        const data = await response.json();
        setFlight(data);
      } catch (error) {
        console.error(error);
        router.push("/home/flights");
      }
    }
    fetchFlight();
  }, [params.id, router]);

  const handleSubmit = async (flightData: any) => {
    try {
      const response = await fetch(`/api/flights/edit/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flightData),
      });

      if (!response.ok) throw new Error("Error al actualizar vuelo");

      router.push(`/home/flights/${params.id}`);
    } catch (error) {
      alert("Error al actualizar el vuelo");
      console.error(error);
    }
  };

  if (!flight) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Editar Vuelo {flight.flight_number}</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <FlightForm 
          mode="edit"
          initialData={flight}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}