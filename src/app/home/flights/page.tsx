import axios from "axios";
import FlightCard from "@/components/FlightCard";

async function LoadFlights() {
    const { data } = await axios.get("http://localhost:3000/api/flights");
    return data;
}

async function FlightsPage() {
    const flights = await LoadFlights();
    console.log(flights);

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-white text-3xl">Vuelos Disponibles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {flights.map((flight: any) => (
                    <FlightCard key={flight.id} flight={flight} />
                ))}
            </div>
        </div>
    );
}

export default FlightsPage;