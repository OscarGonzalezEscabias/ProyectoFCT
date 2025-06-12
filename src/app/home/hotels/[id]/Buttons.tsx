"use client"

import { useRouter } from "next/navigation"
import axios from "axios"
import { useSession } from "next-auth/react"

function Button({ id }: { id: string }) {
    const router = useRouter()
    const { data: session, status } = useSession();
    const currentUser = session?.user as { id: number; role: string; name: string };

    return (
        <div className="flex gap-2">
            {currentUser?.role === "ADMIN" && (
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
            )}
        </div>
    )
}

export default Button
