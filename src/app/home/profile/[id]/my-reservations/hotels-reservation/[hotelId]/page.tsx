import axios from "axios"
import ProfileHotelsReservationCard from "@/components/ProfileHotelsReservationCard"
import Buttons from "./Buttons"

async function LoadReservation(hotelId: string) {
    const { data } = await axios.get(`http://localhost:3000/api/reservation/${hotelId}`)
    return data
}

async function ReservationPage({params}: {params: {id: string, hotelId: string}}) {
    const hotelId = params.hotelId
    const reservation = await LoadReservation(hotelId)
    console.log(reservation)
    return (
        <section className="flex items-center justify-center h-full">
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4 items-center justify-center">
                <ProfileHotelsReservationCard reservation={reservation}></ProfileHotelsReservationCard>
                <Buttons id={params.id} hotelId={hotelId}/>
            </div>
        </section>
       
    )
}

export default ReservationPage