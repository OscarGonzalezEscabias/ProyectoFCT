import axios from "axios";
import FlightCard from "@/components/cards/FlightCard";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function LoadFlights() {
  const { data } = await axios.get("http://localhost:3000/api/flights");
  return data;
}

interface Props {
  searchParams?: { page?: string };
}

const FLIGHTS_PER_PAGE = 6;

async function FlightsPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user as { id: number; role: string; name: string };

  const page = parseInt(searchParams?.page || "1", 10);
  const flights = await LoadFlights();

  const totalPages = Math.ceil(flights.length / FLIGHTS_PER_PAGE);
  const startIndex = (page - 1) * FLIGHTS_PER_PAGE;
  const endIndex = startIndex + FLIGHTS_PER_PAGE;
  const pagedFlights = flights.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-3xl">Vuelos Disponibles</h1>
        {currentUser?.role === "ADMIN" && (
          <Link href="/home/flights/add">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Crear vuelo
            </button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pagedFlights.map((flight: any) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <Link
          href={`/home/flights?page=${page - 1}`}
          className={`px-4 py-2 rounded-lg ${
            page <= 1
              ? "bg-gray-400 cursor-not-allowed pointer-events-none"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Anterior
        </Link>

        <span className="text-white">
          Página {page} de {totalPages}
        </span>

        <Link
          href={`/home/flights?page=${page + 1}`}
          className={`px-4 py-2 rounded-lg ${
            page >= totalPages
              ? "bg-gray-400 cursor-not-allowed pointer-events-none"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Siguiente
        </Link>
      </div>
    </div>
  );
}

export default FlightsPage;
