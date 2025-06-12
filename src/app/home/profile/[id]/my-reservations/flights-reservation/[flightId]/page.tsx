import axios from "axios"
import ProfileFlightsReservationCard from "@/components/ProfileFlightsReservationCard"
import Buttons from "./Buttons"

async function LoadFlightReservation(flightId: string) {
    const { data } = await axios.get(`http://localhost:3000/api/flight-reservation/${flightId}`)
    return data
}

async function FlightreservationPage({params}: {params: {id: string, flightId: string}}) {
    const flightId = params.flightId
    const reservation = await LoadFlightReservation(flightId)
    console.log(reservation)
    return (
        <section className="flex items-center justify-center h-full">
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4 items-center justify-center">
                <ProfileFlightsReservationCard reservation={reservation}></ProfileFlightsReservationCard>
                <Buttons id={params.id} flightId={flightId}/>
            </div>
        </section>
    )
}

export default FlightreservationPage