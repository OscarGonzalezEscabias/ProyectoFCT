"use client"

import { useRouter } from "next/navigation"
import axios from "axios"

function Buttons({id, hotelId}: {id: string, hotelId: string}) {
    const router = useRouter()
    return (
        <div className="flex gap-2">
            <button className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer" onClick={() => router.push(`/home/profile/${id}/my-reservations/hotels-reservation/${hotelId}/edit?from=profile`)}>Editar</button>
            <button className="bg-red-500 text-white p-2 rounded-lg cursor-pointer" onClick={async () => {
                if (confirm("¿Estás seguro de que quieres eliminar esta reserva?")) {
                    const response = await axios.delete(`/api/reservation/del/${hotelId}`)
                    console.log(response)
                    router.push(`/home/profile/${id}/my-reservations`)
                }
            }}>Eliminar</button>
        </div>
    )
}

export default Buttons