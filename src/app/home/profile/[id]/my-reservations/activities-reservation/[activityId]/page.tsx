import axios from "axios"
import ProfileActivitiesReservationCard from "@/components/ProfileActivitiesReservationCard"
import Buttons from "./Buttons"

async function LoadActivityReservation(activityId: string) {
    const { data } = await axios.get(`http://localhost:3000/api/activities-reservation/${activityId}`)
    return data
}

async function ActivityreservationPage({params}: {params: {id: string, activityId: string}}) {
    const activityId = params.activityId
    const reservation = await LoadActivityReservation(activityId)
    console.log(reservation)
    return (
        <section className="flex items-center justify-center h-full">
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4 items-center justify-center">
                <ProfileActivitiesReservationCard reservation={reservation}></ProfileActivitiesReservationCard>
                <Buttons id={params.id} activityId={activityId}/>
            </div>
        </section>
    )
}

export default ActivityreservationPage