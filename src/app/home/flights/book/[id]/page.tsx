"use client";
import { useRouter, useParams } from "next/navigation";
import FlightForm from "@/components/FlightForm";

export default function BookFlightPage() {
  const router = useRouter();
  const params = useParams();

  const handleSubmit = async (reservationData: any) => {
    try {
      console.log(reservationData)
      const response = await fetch("/api/flights-reservation/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) throw new Error("Error al crear reserva");

      alert("Reserva creada exitosamente!");
      router.push(`/home/flights/${params.id}`);
    } catch (error) {
      alert("Error al crear la reserva");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Reservar Vuelo</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <FlightForm 
          mode="reserve"
          flightId={params.id as string}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}