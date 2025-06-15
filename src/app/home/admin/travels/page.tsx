import axios from "axios";
import TravelsCard from "@/components/cards/TravelsCard";

async function LoadTravels() {
  const { data } = await axios.get("http://localhost:3000/api/travels");
  return data;
}

async function TravelsPage() {
  const data = await LoadTravels();
  console.log(data);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-white text-3xl">Viajes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((travel: any) => (
          <TravelsCard key={travel.id} travel={travel} />
        ))}
      </div>
    </div>
  );
}

export default TravelsPage;
