import axios from "axios";
import AircraftsCard from "@/components/AircraftsCard";
import Link from "next/link";

async function LoadAircrafts() {
  const { data } = await axios.get("http://localhost:3000/api/aircrafts");
  return data;
}

async function AircraftPage() {
  const data = await LoadAircrafts();
  console.log(data);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-3xl">Aviones</h1>
        <Link href="/home/aircrafts/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Crear avion
          </button>
        </Link>
      </div>

      {data.map((aircraft: any) => (
        <AircraftsCard key={aircraft.id} aircrafts={aircraft} />
      ))}
    </div>
  );
}

export default AircraftPage;
