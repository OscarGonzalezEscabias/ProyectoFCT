"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

function Button({ id }: { id: string }) {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <button
        className="bg-yellow-500 text-white p-2 rounded-lg cursor-pointer"
        onClick={() => router.push(`/home/aircrafts/edit/${id}`)}
      >
        Editar
      </button>

      <button
        className="bg-red-500 text-white p-2 rounded-lg cursor-pointer"
        onClick={async () => {
          if (confirm("¿Estás seguro de que quieres eliminar este avión?")) {
            try {
              const response = await axios.delete(`/api/aircrafts/del/${id}`);
              console.log(response);
              router.push("/home/aircrafts");
            } catch (error) {
              console.error("Error eliminando aircraft:", error);
              alert("No se pudo eliminar el aircraft.");
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
