"use client"

import { useRouter } from "next/navigation"
import axios from "axios"
import { useSession } from "next-auth/react"

function Button({ id }: { id: string }) {
    const router = useRouter()
    const { data: session } = useSession()
    const currentUser = session?.user as { id: number; role: string; name: string } | undefined

    return (
        <div className="flex gap-2">
            {currentUser?.role === "ADMIN" && (
                <button
                    className="bg-red-500 text-white p-2 rounded-lg cursor-pointer"
                    onClick={async () => {
                        if (confirm("¿Estás seguro de que quieres eliminar esta actividad?")) {
                            try {
                                const response = await axios.delete(`/api/activities/del/${id}`)
                                console.log(response)
                                router.push("/home/activities")
                            } catch (error) {
                                console.error("Error eliminando actividad:", error)
                                alert("No se pudo eliminar el actividad.")
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
