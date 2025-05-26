"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

function Buttons({ id, type }: { id: string, type: 'reservation' | 'flight' }) {
    const router = useRouter();
    const basePath = type === 'reservation' ? '/home/reservation' : '/home/flights';
    
    return (
        <div className="flex gap-2 mt-4">
            <button 
                className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer"
                onClick={() => router.push(`${basePath}/edit/${id}`)}
            >
                Editar
            </button>
            
            <button 
                className="bg-red-500 text-white p-2 rounded-lg cursor-pointer"
                onClick={async () => {
                    if (confirm("¿Estás seguro de que quieres eliminar este registro?")) {
                        const response = await axios.delete(`/api/${type}/del/${id}`);
                        console.log(response);
                        router.push(basePath);
                    }
                }}
            >
                Eliminar
            </button>
            
            {type === 'flight' && (
                <button 
                    className="bg-green-500 text-white p-2 rounded-lg cursor-pointer"
                    onClick={() => router.push(`${basePath}/book/${id}`)}
                >
                    Reservar
                </button>
            )}
        </div>
    );
}

export default Buttons;