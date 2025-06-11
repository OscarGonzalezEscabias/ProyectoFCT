import axios from "axios";
import FlightCard from "@/components/FlightCard";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function LoadFlights() {
    const { data } = await axios.get("http://localhost:3000/api/flights");
    return data;
}

async function FlightsPage() {
    const session = await getServerSession(authOptions);
    const currentUser = session?.user as { id: number; role: string; name: string };
    const flights = await LoadFlights();
    console.log(flights);

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
                {flights.map((flight: any) => (
                    <FlightCard key={flight.id} flight={flight} />
                ))}
            </div>
        </div>
    );
}

export default FlightsPage;