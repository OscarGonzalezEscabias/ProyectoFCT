import axios from "axios";
import TravelsCard from "@/components/cards/TravelsCard";

async function LoadDataTravels() {
  const { data: travels } = await axios.get("http://localhost:3000/api/travels");

  const travelsWithFlights = await Promise.all(
    travels.map(async (travel: any) => {
      const [outboundRes, returnRes] = await Promise.all([
        axios.get(`http://localhost:3000/api/flights/${travel.outbound_flight_reservation_id}`),
        axios.get(`http://localhost:3000/api/flights/${travel.return_flight_reservation_id}`)
      ]);

      return {
        ...travel,
        outboundFlight: outboundRes.data,
        returnFlight: returnRes.data,
      };
    })
  );

  return travelsWithFlights;
}


async function TravelsPage() {
  const data = await LoadDataTravels();
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
