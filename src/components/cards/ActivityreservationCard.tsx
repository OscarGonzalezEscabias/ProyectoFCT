"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ActivityReservation {
  id: number;
  user_id: number;
  activity_id: number;
  total_price: number | string;
  initial_date: string;
  final_date: string | null;
}

function ActivityReservationCard({ reservation }: { reservation: ActivityReservation }) {
  const [usuario, setUsuario] = useState<string>("Cargando...");
  const [actividad, setActividad] = useState<string>("Cargando...");

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
    async function fetchActividad() {
      try {
        const res = await axios.get(`http://localhost:3000/api/activities/${reservation.activity_id}`);
        if (res.data?.name) {
          setActividad(res.data.name);
        } else {
          setActividad("Actividad no encontrada");
        }
      } catch {
        setActividad("Error al cargar actividad");
      }
    }
    fetchActividad();
  }, [reservation.activity_id]);

  // Formateo fechas
  const initialDateFormatted = new Date(reservation.initial_date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const finalDateFormatted = reservation.final_date
    ? new Date(reservation.final_date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <Link
      href={`/home/admin/activities-reservation/${reservation.id}`}
      className="bg-white p-4 rounded-lg shadow-lg mb-3 hover:bg-gray-100 transition"
    >
      <h2 className="font-bold text-2xl">{usuario}</h2>

      <p className="text-gray-500">
        <span className="font-bold text-black">Actividad:</span> {actividad}
      </p>
      <p className="text-gray-500">
        <span className="font-bold text-black">Fecha inicio:</span> {initialDateFormatted}
      </p>
      <p className="text-gray-500">
        <span className="font-bold text-black">Fecha fin:</span> {finalDateFormatted}
      </p>

      <div className="mt-2">
        <span className="text-lg font-semibold text-blue-600">
          Precio total: {Number(reservation.total_price).toFixed(2)} €
        </span>
      </div>
    </Link>
  );
}

export default ActivityReservationCard;
