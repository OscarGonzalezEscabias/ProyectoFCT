import axios from "axios"
import FlightreservationCard from "@/components/cards/FlightreservationCard"

async function LoadFligthReservation() {
    const { data } = await axios.get("http://localhost:3000/api/flight-reservation");
    return data
}

async function FligthReservationPage() {
    const data = await LoadFligthReservation()
    console.log(data)

  return (
    <div className="flex flex-col gap-4">
        <h1 className="text-white text-3xl">Reservas</h1>
        {data.map((flight_reservations: any) => (
            <FlightreservationCard key={flight_reservations.id} reservation={flight_reservations}/>
        ))}
    </div>
  )
}

export default FligthReservationPage