"use client";
import { useRouter } from "next/navigation";

export default function TravelsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-br">
      <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg">
        Viajes Personalizados
      </h1>
      <p className="max-w-xl text-center text-gray-300 mb-10 leading-relaxed">
        Personaliza tus viajes como quieras, añadiendo vuelos, reservas en hoteles y
        reservando distintas actividades para hacer que tu viaje sea único e inolvidable.
      </p>
      <button
        onClick={() => router.push("/home/travels/add")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-colors duration-300 ease-in-out
                   focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
        aria-label="Personalizar viaje"
      >
        Personalizar Viaje
      </button>
    </div>
  );
}
