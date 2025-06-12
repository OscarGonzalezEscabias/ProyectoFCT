import axios from "axios";
import FlightDetailCard from "@/components/cards/FlightDetailCard";

async function LoadFlight(id: string) {
    const { data } = await axios.get(`http://localhost:3000/api/flights/${id}`);
    return data;
}

async function FlightDetailPage({ params }: { params: { id: string } }) {
    const flight = await LoadFlight(params.id);
    
    return (
        <section className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-4xl">
                <FlightDetailCard flight={flight} />
            </div>
        </section>
    );
}

export default FlightDetailPage;