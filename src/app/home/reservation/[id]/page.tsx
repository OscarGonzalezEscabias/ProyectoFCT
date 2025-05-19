import axios from "axios"
import Buttons from "./Buttons"
import ReservationCard from "@/components/ReservationCard"

async function LoadReservation(id: string) {
    const { data } = await axios.get(`http://localhost:3000/api/reservation/${id}`)
    return data
}

async function ReservationPage({params}: {params: {id: string}}) {
    const id = params.id
    const reservation = await LoadReservation(id)
    console.log(reservation)
    return (
        <section className="flex items-center justify-center h-full">
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4 items-center justify-center">
                <ReservationCard reservation={reservation}></ReservationCard>
                <Buttons id={id}/>
            </div>
        </section>
       
    )
}

export default ReservationPage