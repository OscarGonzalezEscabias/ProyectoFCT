import axios from "axios";
import AirportsCard from "@/components/AirportsCard";
import Link from "next/link";

async function LoadAirports() {
  const { data } = await axios.get("http://localhost:3000/api/airports");
  return data;
}

async function AirportsPage() {
  const data = await LoadAirports();
  console.log(data);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-3xl">Aeropuertos</h1>
        <Link href="/home/admin/airports/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Crear aeropuerto
          </button>
        </Link>
      </div>

      {data.map((airport: any) => (
        <AirportsCard key={airport.id} airports={airport} />
      ))}
    </div>
  );
}

export default AirportsPage;
