"use client";
import FlightForm from "@/components/FlightForm";
import { useRouter } from "next/navigation";

function BookFlightPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleSubmit = async (reservation: any) => {
    try {
      const response = await fetch("/api/flight-reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      });

      if (!response.ok) {
        throw new Error("Error al realizar la reserva");
      }

      alert("Reserva realizada con éxito!");
      router.push("/home/flights");
    } catch (error) {
      alert("Error al realizar la reserva");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Reservar Vuelo</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <FlightForm flightId={params.id} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default BookFlightPage;