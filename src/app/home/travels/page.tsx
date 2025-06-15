"use client";
import { useRouter } from "next/navigation";

export default function TravelsPage() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-2xl font-bold text-white">Viejaes personlizados</h1>
            <p className="text-gray-200 text-center">Personaliza tus viajes como quieras, añadiendo vuelos, reservas en hoteles y reservando distintas actividades que hacer en el viaje</p>
            <button onClick={() => router.push("/home/travels/add")} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">Personalizar viaje</button>
        </div>
    )
}