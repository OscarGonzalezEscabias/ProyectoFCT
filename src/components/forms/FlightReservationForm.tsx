"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter, useParams, useSearchParams } from "next/navigation";

interface User {
  id: number;
  username: string;
}

interface Flight {
  id: number;
  flight_number: string;
}

interface Seat {
  id: number;
  seat_number: string;
  class: string;
  is_available: boolean;
  price_modifier: number;
  flight_id: number;
}

interface FlightReservation {
  user_id: number | "";
  flight_id: number | "";
  seat_id: number | "";
  reservation_date: string;
  total_price: number;
}

function FlightReservationForm() {
  const [reservation, setReservation] = useState<FlightReservation>({
    user_id: "",
    flight_id: "",
    seat_id: "",
    reservation_date: new Date().toISOString().slice(0, 16),
    total_price: 0,
  });

  const [users, setUsers] = useState<User[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);

  const router = useRouter();
  const params = useParams();
  const form = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const from = searchParams.get('from');  

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, flightsRes, seatsRes] = await Promise.all([
          axios.get("/api/users"),
          axios.get("/api/flights"),
          axios.get("/api/flight_seats"),
        ]);
        setUsers(usersRes.data);
        setFlights(flightsRes.data);
        setSeats(seatsRes.data);
      } catch (error) {
        console.error("Error cargando datos", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (params.id) {
      if (from === "profile") {
        axios
          .get(`/api/flight-reservation/${params.flightId}`)
          .then((res) => {
            const data = res.data;
            setReservation({
            user_id: data.user_id,
            flight_id: data.flight_id,
            seat_id: data.seat_id,
            reservation_date: data.reservation_date.slice(0, 16),
            total_price: Number(data.total_price),
          });
        })
        .catch(() => {
          alert("Error al cargar la reserva de vuelo");
        });
      } else {
        axios
          .get(`/api/flight-reservation/${params.id}`)
          .then((res) => {
            const data = res.data;
            setReservation({
            user_id: data.user_id,
            flight_id: data.flight_id,
            seat_id: data.seat_id,
            reservation_date: data.reservation_date.slice(0, 16),
            total_price: Number(data.total_price),
          });
        })
        .catch(() => {
          alert("Error al cargar la reserva de vuelo");
        });
      }
    }
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setReservation((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "seat_id" && value) {
        const seat = seats.find((s) => s.id === Number(value));
        if (seat) {
          // Puedes usar un precio base si quieres, por ejemplo, 100€ * modificador
          updated.total_price = Number((100 * seat.price_modifier).toFixed(2));
        }
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...reservation,
      user_id: Number(reservation.user_id),
      flight_id: Number(reservation.flight_id),
      seat_id: Number(reservation.seat_id),
      total_price: Number(reservation.total_price),
    };

    try {
      if (params.id) {
        if (from === "profile") {
            console.log(payload)
            const response = await axios.put(`/api/flight-reservation/edit/${params.flightId}`, payload);
            console.log(response)
        } else {
            console.log(payload)
            const response = await axios.put(`/api/flight-reservation/edit/${params.id}`, payload);
            console.log(response)
        }
      } else {
        await axios.post("/api/flight-reservation/add", payload);
      }
      form.current?.reset();
      
      if(from === "profile"){
        router.push(`/home/profile/${params.id}/my-reservations`)
      }else{
        router.push("/home/admin/flight-reservation");
      }
    } catch (error) {
      alert("Error al guardar la reserva de vuelo");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={form}
      className="flex flex-col gap-4 bg-white p-6 rounded-lg w-96"
    >
      <label htmlFor="user_id" className="text-gray-700 font-bold">
        Usuario
      </label>
      <select
        name="user_id"
        value={reservation.user_id}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        required
      >
        <option value="">Selecciona un usuario</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>

      <label htmlFor="flight_id" className="text-gray-700 font-bold">
        Vuelo
      </label>
      <select
        name="flight_id"
        value={reservation.flight_id}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        required
      >
        <option value="">Selecciona un vuelo</option>
        {flights.map((flight) => (
          <option key={flight.id} value={flight.id}>
            {flight.flight_number}
          </option>
        ))}
      </select>

      <label htmlFor="seat_id" className="text-gray-700 font-bold">
        Asiento
      </label>
      <select
        name="seat_id"
        value={reservation.seat_id}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        required
      >
        <option value="">Selecciona un asiento</option>
        {seats
          .filter((seat) => seat.is_available)
          .map((seat) => (
            <option key={seat.id} value={seat.id}>
              {seat.seat_number} ({seat.class}) x{seat.price_modifier}
            </option>
          ))}
      </select>

      <label htmlFor="reservation_date" className="text-gray-700 font-bold">
        Fecha de compra
      </label>
      <input
        type="datetime-local"
        name="reservation_date"
        value={reservation.reservation_date}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        disabled={!!params.id} // Deshabilitado si es edición
        required
      />

      <label htmlFor="total_price" className="text-gray-700 font-bold">
        Precio total (€)
      </label>
      <input
        type="number"
        name="total_price"
        value={reservation.total_price}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        readOnly
      />

      <button
        type="submit"
        className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        {params.id ? "Editar Reserva" : "Crear Reserva"}
      </button>
    </form>
  );
}

export default FlightReservationForm;