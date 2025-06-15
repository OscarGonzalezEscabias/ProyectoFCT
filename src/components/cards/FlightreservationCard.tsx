"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

function FlightReservationCard({ reservation }: { reservation: any }) {
  const [usuario, setUsuario] = useState<string>("Cargando...");
  const [vuelo, setVuelo] = useState<string>("Cargando...");
  const [asiento, setAsiento] = useState<string>("Cargando...");

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
    async function fetchVuelo() {
      try {
        const res = await axios.get(`http://localhost:3000/api/flights/${reservation.flight_id}`);
        if (res.data?.flight_number) {
          setVuelo(`${res.data.flight_number}`);
        } else {
          setVuelo("Vuelo no encontrado");
        }
      } catch {
        setVuelo("Error al cargar vuelo");
      }
    }
    fetchVuelo();
  }, [reservation.flight_id]);

  useEffect(() => {
    async function fetchAsiento() {
      try {
        const res = await axios.get(`http://localhost:3000/api/flight_seats/${reservation.seat_id}`);
        if (res.data?.seat_number) {
          setAsiento(`Asiento ${res.data.seat_number} (${res.data.class})`);
        } else {
          setAsiento("Asiento no encontrado");
        }
      } catch {
        setAsiento("Error al cargar asiento");
      }
    }
    fetchAsiento();
  }, [reservation.seat_id]);

  const fechaReserva = new Date(reservation.reservation_date).toLocaleString("es-ES", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <Link
      href={`/home/admin/flight-reservation/${reservation.id}`}
      className="bg-white p-4 rounded-lg shadow-lg mb-3 hover:bg-gray-100 transition"
    >
      <h2 className="font-bold text-2xl">{usuario}</h2>

      <p className="text-gray-500">
        <span className="font-bold text-black">Vuelo:</span> {vuelo}
      </p>
      <p className="text-gray-500">
        <span className="font-bold text-black">Asiento:</span> {asiento}
      </p>
      <p className="text-gray-500">
        <span className="font-bold text-black">Fecha de compra:</span> {fechaReserva}
      </p>
      <div className="mt-2">
        <span className="text-lg font-semibold text-blue-600">
          Precio total: {Number(reservation.total_price).toFixed(2)} €
        </span>
      </div>
    </Link>
  );
}

export default FlightReservationCard;
