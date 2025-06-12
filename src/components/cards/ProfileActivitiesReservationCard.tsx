"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

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
      href={`/home/profile/${reservation.user_id}/my-reservations/activities-reservation/${reservation.id}`}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden block mb-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Reserva #{reservation.id}</h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          Usuario: {usuario}
        </span>
      </div>

      <div className="text-sm text-gray-600 mb-2">
        <p><strong>Actividad:</strong> {actividad}</p>
        <p><strong>Fecha inicio:</strong> {initialDateFormatted}</p>
        <p><strong>Fecha fin:</strong> {finalDateFormatted}</p>
      </div>

      <div className="mt-4">
        <span className="text-lg font-semibold text-blue-600">
          Total: {Number(reservation.total_price).toFixed(2)} €
        </span>
      </div>
    </Link>
  );
}

export default ActivityReservationCard;
