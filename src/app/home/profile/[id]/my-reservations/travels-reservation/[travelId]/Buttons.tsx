"use client"

import { useRouter } from "next/navigation"
import axios from "axios"

function Buttons({id, travelId}: {id: string, travelId: string}) {
    const router = useRouter()
    return (
        <div className="flex gap-2">
            <button className="bg-red-500 text-white p-2 rounded-lg cursor-pointer" onClick={async () => {
                if (confirm("¿Estás seguro de que quieres eliminar esta reserva?")) {
                    const response = await axios.delete(`/api/travels/del/${travelId}`)
                    console.log(response)
                    router.push(`/home/profile/${id}/my-reservations`)
                }
            }}>Eliminar</button>
        </div>
    )
}

export default Buttons