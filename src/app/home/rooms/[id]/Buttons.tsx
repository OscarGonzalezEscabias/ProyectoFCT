"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

function Button({ id }: { id: string }) {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <button
        className="bg-yellow-500 text-white p-2 rounded-lg cursor-pointer"
        onClick={() => router.push(`/home/rooms/edit/${id}`)}
      >
        Editar
      </button>

      <button
        className="bg-red-500 text-white p-2 rounded-lg cursor-pointer"
        onClick={async () => {
          if (confirm("¿Estás seguro de que quieres eliminar esta habitación?")) {
            try {
              const response = await axios.delete(`/api/rooms/del/${id}`);
              console.log(response);
              router.push("/home/rooms");
            } catch (error) {
              console.error("Error eliminando room:", error);
              alert("No se pudo eliminar la habitación.");
            }
          }
        }}
      >
        Eliminar
      </button>
    </div>
  );
}

export default Button;
