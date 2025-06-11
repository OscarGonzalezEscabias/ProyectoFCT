"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

function ReservationCard({ reservation }: { reservation: any }) {
    const [usuario, setUsuario] = useState<string>("Cargando...");
    const [habitacion, setHabitacion] = useState<string>("Cargando...");

    useEffect(() => {
        async function fetchUsuario() {
            try {
                const res = await axios.get(`http://localhost:3000/api/users/${reservation.user_id}`);
                if (res.data?.username) {
                    setUsuario(res.data.username);
                } else {
                    setUsuario("Usuario no encontrado");
                }
            } catch {
                setUsuario("Error al cargar usuario");
            }
        }
        fetchUsuario();
    }, [reservation.user_id]);

    useEffect(() => {
        async function fetchHabitacion() {
            try {
                const res = await axios.get(`http://localhost:3000/api/rooms/${reservation.room_id}`);
                if (res.data?.name) {
                    setHabitacion(res.data.name);
                } else {
                    setHabitacion("Habitación no encontrada");
                }
            } catch {
                setHabitacion("Error al cargar habitación");
            }
        }
        fetchHabitacion();
    }, [reservation.room_id]);

    const checkInFormatted = new Date(reservation.check_in).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const checkOutFormatted = new Date(reservation.check_out).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <Link
            href={`/home/admin/reservation/${reservation.id}`}
            className="bg-white p-4 rounded-lg shadow-lg mb-3 hover:bg-gray-100 margin-2 items-center"
        >
            <h2 className="font-bold text-2xl">{usuario}</h2>

            <p className="text-gray-500">
                <span className="font-bold text-black">Habitación:</span> {habitacion}
            </p>
            <p className="text-gray-500">
                <span className="font-bold text-black">Entrada:</span> {checkInFormatted}
            </p>
            <p className="text-gray-500">
                <span className="font-bold text-black">Salida:</span> {checkOutFormatted}
            </p>
            <p className="text-gray-500">
                <span className="font-bold text-black">Precio total:</span> {reservation.total_price} €
            </p>
        </Link>
    );

}

export default ReservationCard;
