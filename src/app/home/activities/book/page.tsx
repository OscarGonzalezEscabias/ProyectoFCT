"use client";
import { useRouter, useParams } from "next/navigation";
import ActivityReservationForm from "@/components/forms/ActivityreservationForm";

export default function BookActivitiesPage() {
  const router = useRouter();
  const params = useParams();

  const handleSubmit = async (reservationData: any) => {
    try {
      console.log(reservationData)
      const response = await fetch("/api/activities/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) throw new Error("Error al crear reserva");

      router.push(`/home/activities/${params.id}`);
    } catch (error) {
      alert("Error al crear la reserva");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ActivityReservationForm
        />
      </div>
    </div>
  );
}