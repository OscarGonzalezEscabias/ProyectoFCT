import axios from "axios";
import Flight_seatsCard from "@/components/cards/Flight_seatsCard";
import Link from "next/link";

async function LoadFlight_seats() {
  const { data } = await axios.get("http://localhost:3000/api/flight_seats");
  return data;
}

async function Flight_seatsPage() {
  const data = await LoadFlight_seats();
  console.log(data);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-3xl">Asientos</h1>
        <Link href="/home/admin/flight_seats/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Crear asiento
          </button>
        </Link>
      </div>

      {data.map((flight_seats: any) => (
        <Flight_seatsCard key={flight_seats.id} flight_seatss={flight_seats} />
      ))}
    </div>
  );
}

export default Flight_seatsPage;
