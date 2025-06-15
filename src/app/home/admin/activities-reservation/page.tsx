import axios from "axios";
import ActivityreservationCard from "@/components/cards/ActivityreservationCard";

const RESERVATIONS_PER_PAGE = 6;

async function LoadActivityReservation() {
  const { data } = await axios.get("http://localhost:3000/api/activities-reservation");
  return data;
}

async function ActivityreservationPage({ searchParams }: { searchParams?: { page?: string } }) {
  const data = await LoadActivityReservation();

  const page = parseInt(searchParams?.page || "1", 10);
  const totalPages = Math.ceil(data.length / RESERVATIONS_PER_PAGE);
  const startIndex = (page - 1) * RESERVATIONS_PER_PAGE;
  const endIndex = startIndex + RESERVATIONS_PER_PAGE;
  const pagedReservations = data.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-white text-3xl">Reservas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pagedReservations.map((activities_reservations: any) => (
          <ActivityreservationCard key={activities_reservations.id} reservation={activities_reservations} />
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

export default ActivityreservationPage;
