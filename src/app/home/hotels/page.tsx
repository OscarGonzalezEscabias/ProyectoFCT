import axios from "axios"
import HotelsCard from "@/components/HotelsCard"

async function LoadHotels() {
    const { data } = await axios.get("http://localhost:3000/api/hotels")
    return data
}

async function HotelsPage() {
    const data = await LoadHotels()
    console.log(data)

  return (
    <div className="flex flex-col gap-4">
        <h1 className="text-white text-3xl">Hoteles</h1>
        {data.map((hotel: any) => (
            <HotelsCard key={hotel.id} hotels={hotel}/>
        ))}
    </div>
  )
}

export default HotelsPage