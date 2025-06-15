"use client"

import { useRouter } from "next/navigation"
import axios from "axios"

function Buttons({id}: {id: string}) {
    const router = useRouter()
    return (
        <div className="flex gap-2">
            <button className="bg-red-500 text-white p-2 rounded-lg cursor-pointer" onClick={async () => {
                if (confirm("¿Estás seguro de que quieres eliminar este viaje?")) {
                    const response = await axios.delete(`/api/travels/del/${id}`)
                    console.log(response)
                    router.push("/home/admin/travels")
                }
            }}>Eliminar</button>
        </div>
    )
}

export default Buttons