import axios from "axios";
import AirlinesCard from "@/components/AirlinesCard";
import Link from "next/link";

async function LoadAirlines() {
  const { data } = await axios.get("http://localhost:3000/api/airlines");
  return data;
}

async function AirlinesPage() {
  const data = await LoadAirlines();
  console.log(data);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-3xl">Aerolineas</h1>
        <Link href="/home/admin/airlines/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Crear aerolinea
          </button>
        </Link>
      </div>

      {data.map((airline: any) => (
        <AirlinesCard key={airline.id} airlines={airline} />
      ))}
    </div>
  );
}

export default AirlinesPage;
