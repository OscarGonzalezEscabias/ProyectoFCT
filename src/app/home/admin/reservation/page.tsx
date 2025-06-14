import axios from "axios"
import ReservationCard from "@/components/cards/ReservationCard"

async function LoadReservation() {
  const { data } = await axios.get("http://localhost:3000/api/reservation");
  return data
}

async function ReservationPage() {
  const data = await LoadReservation()
  console.log(data)

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-white text-3xl">Reservas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((reservation: any) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </div>
    </div>
  )
}

export default ReservationPage