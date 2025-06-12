"use client";
import { useRouter } from "next/navigation";
import FlightForm from "@/components/forms/FlightForm";

export default function NewFlightPage() {
  const router = useRouter();

  const handleSubmit = async (flightData: any) => {
    try {
      const response = await fetch("/api/flights/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flightData),
      });

      if (!response.ok) throw new Error("Error al crear vuelo");

      const data = await response.json();
      router.push(`/home/flights/${data.id}`);
    } catch (error) {
      alert("Error al crear el vuelo");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Crear Nuevo Vuelo</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <FlightForm 
          mode="create"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}