"use client";
import { useRouter } from "next/navigation";

export default function TravelsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-1 justify-center items-center flex-col px-6 text-center bg-transparent py-16">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg transition-all duration-300">
        Viajes Personalizados
      </h1>

      <p className="max-w-2xl text-base sm:text-lg text-gray-300 mb-10 leading-relaxed">
        Diseña tu aventura ideal eligiendo vuelos, hoteles y actividades únicas. 
        Tú decides el rumbo, nosotros lo hacemos realidad.  
      </p>

      <button
        onClick={() => router.push("/home/travels/add")}
        className="relative inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold text-white 
                   bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg 
                   hover:from-indigo-500 hover:to-purple-600 hover:scale-105 hover:shadow-xl 
                   transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 
                   focus:ring-blue-400 focus:ring-opacity-50"
        aria-label="Personalizar viaje"
      >
        <span className="relative z-10">Personalizar Viaje</span>
        <span className="absolute inset-0 rounded-full bg-white opacity-10 blur-sm transition duration-300" />
      </button>
    </div>
  );
}
