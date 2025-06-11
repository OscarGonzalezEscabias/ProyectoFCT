import axios from "axios"
import Buttons from "./Buttons"
import FlightreservationCard from "@/components/FlightreservationCard"

async function LoadFlightReservation(id: string) {
    const { data } = await axios.get(`http://localhost:3000/api/flight-reservation/${id}`)
    return data
}

async function FlightreservationPage({params}: {params: {id: string}}) {
    const id = params.id
    const reservation = await LoadFlightReservation(id)
    console.log(reservation)
    return (
        <section className="flex items-center justify-center h-full">
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4 items-center justify-center">
                <FlightreservationCard reservation={reservation}></FlightreservationCard>
                <Buttons id={id}/>
            </div>
        </section>
       
    )
}

export default FlightreservationPage