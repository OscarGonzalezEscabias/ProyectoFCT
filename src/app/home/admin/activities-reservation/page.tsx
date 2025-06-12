import axios from "axios"
import ActivityreservationCard from "@/components/cards/ActivityreservationCard"

async function LoadActivityReservation() {
    const { data } = await axios.get("http://localhost:3000/api/activities-reservation");
    return data
}

async function ActivityreservationPage() {
    const data = await LoadActivityReservation()
    console.log(data)

  return (
    <div className="flex flex-col gap-4">
        <h1 className="text-white text-3xl">Reservas</h1>
        {data.map((activities_reservations: any) => (
            <ActivityreservationCard key={activities_reservations.id} reservation={activities_reservations}/>
        ))}
    </div>
  )
}

export default ActivityreservationPage