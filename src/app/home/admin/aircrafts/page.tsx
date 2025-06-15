import axios from "axios";
import AircraftsCard from "@/components/cards/AircraftsCard";
import Link from "next/link";

const AIRCRAFTS_PER_PAGE = 6;

async function LoadAircrafts() {
  const { data } = await axios.get("http://localhost:3000/api/aircrafts");
  return data;
}

async function AircraftPage({ searchParams }: { searchParams?: { page?: string } }) {
  const data = await LoadAircrafts();
  console.log(data);

  const page = parseInt(searchParams?.page || "1", 10);
  const totalPages = Math.ceil(data.length / AIRCRAFTS_PER_PAGE);
  const startIndex = (page - 1) * AIRCRAFTS_PER_PAGE;
  const endIndex = startIndex + AIRCRAFTS_PER_PAGE;
  const pagedAircrafts = data.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-3xl">Aviones</h1>
        <Link href="/home/admin/aircrafts/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Crear avion
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pagedAircrafts.map((aircraft: any) => (
          <AircraftsCard key={aircraft.id} aircrafts={aircraft} />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <a
          href={`?page=${page - 1}`}
          className={`px-4 py-2 rounded-lg ${
            page <= 1
              ? "bg-gray-400 cursor-not-allowed pointer-events-none"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Anterior
        </a>

        <span className="text-white">
          Página {page} de {totalPages}
        </span>

        <a
          href={`?page=${page + 1}`}
          className={`px-4 py-2 rounded-lg ${
            page >= totalPages
              ? "bg-gray-400 cursor-not-allowed pointer-events-none"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Siguiente
        </a>
      </div>
    </div>
  );
}

export default AircraftPage;
