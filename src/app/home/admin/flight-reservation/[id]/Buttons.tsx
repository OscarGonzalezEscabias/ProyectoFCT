"use client"

import { useRouter } from "next/navigation"
import axios from "axios"

function Buttons({id}: {id: string}) {
    const router = useRouter()
    return (
        <div className="flex gap-2">
            <button className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer" onClick={() => router.push(`/home/admin/flight-reservation/edit/${id}`)}>Editar</button>
            <button className="bg-red-500 text-white p-2 rounded-lg cursor-pointer" onClick={async () => {
                if (confirm("¿Estás seguro de que quieres eliminar esta reserva?")) {
                    const response = await axios.delete(`/api/flight-reservation/del/${id}`)
                    console.log(response)
                    router.push("/home/admin/flight-reservation")
                }
            }}>Eliminar</button>
        </div>
    )
}

export default Buttons