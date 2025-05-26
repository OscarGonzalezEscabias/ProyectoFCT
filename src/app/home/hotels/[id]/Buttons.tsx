"use client"

import { useRouter } from "next/navigation"
import axios from "axios"

function Button({ id }: { id: string }) {
    const router = useRouter()

    return (
        <div className="flex gap-2">
            <button
                className="bg-red-500 text-white p-2 rounded-lg cursor-pointer"
                onClick={async () => {
                    if (confirm("¿Estás seguro de que quieres eliminar este hotel?")) {
                        try {
                            const response = await axios.delete(`/api/hotels/del/${id}`)
                            console.log(response)
                            router.push("/home/hotels")
                        } catch (error) {
                            console.error("Error eliminando hotel:", error)
                            alert("No se pudo eliminar el hotel.")
                        }
                    }
                }}
            >
                Eliminar
            </button>
        </div>
    )
}

export default Button
