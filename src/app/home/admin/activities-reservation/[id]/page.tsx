import axios from "axios"
import Buttons from "./Buttons"
import ActivityreservationCard from "@/components/cards/ActivityreservationCard"

async function LoadActivityReservation(id: string) {
    const { data } = await axios.get(`http://localhost:3000/api/activities-reservation/${id}`)
    return data
}

async function ActivityreservationPage({params}: {params: {id: string}}) {
    const id = params.id
    const reservation = await LoadActivityReservation(id)
    console.log(reservation)
    return (
        <section className="flex items-center justify-center h-full">
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4 items-center justify-center">
                <ActivityreservationCard reservation={reservation}></ActivityreservationCard>
                <Buttons id={id}/>
            </div>
        </section>
       
    )
}

export default ActivityreservationPage