"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

interface User {
  id: number;
  username: string;
}

interface Activity {
  id: number;
  name: string;
  types: "RENTING" | "RESERVATION";
  price: number;
}

interface ActivityReservation {
  user_id: number | "";
  activity_id: number | "";
  initial_date: string;
  final_date: string;
  total_price: number | "";
}

function ActivityReservationForm() {
  const [reservation, setReservation] = useState<ActivityReservation>({
    user_id: "",
    activity_id: "",
    initial_date: new Date().toISOString().slice(0, 10),
    final_date: "",
    total_price: "",
  });

  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  const router = useRouter();
  const params = useParams();
  const form = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const { data: session, status } = useSession();
  const currentUser = session?.user as { id: number; role: string; name: string } | undefined;

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, activitiesRes] = await Promise.all([
          axios.get("/api/users"),
          axios.get("/api/activities"),
        ]);
        setUsers(usersRes.data);
        setActivities(activitiesRes.data);
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
          .get(`/api/activities-reservation/${params.activityId}`)
          .then((res) => {
            const data = res.data;
            setReservation({
            user_id: data.user_id,
            activity_id: data.activity_id,
            initial_date: data.initial_date,
            final_date: data.final_date || "",
            total_price: Number(data.total_price),
          });
        })
        .catch(() => {
          alert("Error al cargar la reserva de actividad");
        });
      } else {
        axios
          .get(`/api/activities-reservation/${params.id}`)
          .then((res) => {
            const data = res.data;
            setReservation({
            user_id: data.user_id,
            activity_id: data.activity_id,
            initial_date: data.initial_date,
            final_date: data.final_date || "",
            total_price: Number(data.total_price),
          });
        })
        .catch(() => {
          alert("Error al cargar la reserva de actividad");
        });
      }
    }
  }, [params.id]);

  const calculateTotalPrice = (
    activity: Activity,
    initial_date: string,
    final_date: string
  ): number => {
    if (activity.types === "RENTING") {
      const start = new Date(initial_date);
      const end = new Date(final_date);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);
      return diffDays * activity.price;
    }
    return activity.price;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setReservation((prev) => {
      const updated = { ...prev, [name]: value };

      const selectedActivity = activities.find(
        (a) => a.id === Number(updated.activity_id)
      );

      if (
        selectedActivity &&
        updated.initial_date &&
        (selectedActivity.types === "RESERVATION" || updated.final_date)
      ) {
        updated.total_price = calculateTotalPrice(
          selectedActivity,
          updated.initial_date,
          updated.final_date
        );
      }

      return updated;
    });
  };

  const selectedActivity = activities.find(
    (a) => a.id === Number(reservation.activity_id)
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) {
      alert("No se pudo identificar al usuario actual");
      return;
    }

    // Si no es admin, forzamos que el user_id sea el del usuario logueado
    const payload = {
      ...reservation,
      user_id: currentUser.role === "ADMIN" ? Number(reservation.user_id) : currentUser.id,
      activity_id: Number(reservation.activity_id),
      total_price: Number(reservation.total_price),
      final_date:
        selectedActivity?.types === "RENTING" && reservation.final_date
          ? reservation.final_date
          : null,
    };

    // Validación básica
    if (!payload.user_id || !payload.activity_id || !reservation.initial_date) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      if (params.id) {
        await axios.put(`/api/activities-reservation/edit/${params.id}`, payload);
      } else {
        await axios.post("/api/activities-reservation/add", payload);
      }
      form.current?.reset();
      if(from === "profile"){
        router.push(`/home/profile/${params.id}/my-reservations`)
      }else{
        router.push("/home/admin/activities-reservation");
      }
    } catch (error) {
      alert("Error al guardar la reserva de actividad");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={form}
      className="flex flex-col gap-4 bg-white p-6 rounded-lg w-96"
    >
      {/* Si es admin, mostramos el selector de usuarios, si no, no */}
      {currentUser?.role === "ADMIN" && (
        <label htmlFor="user_id" className="text-gray-700 font-bold">
          Usuario
        </label>
      )}
      {currentUser?.role === "ADMIN" && (
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
      )}


      <label htmlFor="activity_id" className="text-gray-700 font-bold">
        Actividad
      </label>
      <select
        name="activity_id"
        value={reservation.activity_id}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        required
      >
        <option value="">Selecciona una actividad</option>
        {activities.map((activity) => (
          <option key={activity.id} value={activity.id}>
            {activity.name} - {activity.price} €
          </option>
        ))}
      </select>

      <label htmlFor="initial_date" className="text-gray-700 font-bold">
        Fecha inicio
      </label>
      <input
        type="date"
        name="initial_date"
        value={reservation.initial_date}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2"
        required
      />

      {selectedActivity?.types === "RENTING" && (
        <>
          <label htmlFor="final_date" className="text-gray-700 font-bold">
            Fecha fin
          </label>
          <input
            type="date"
            name="final_date"
            value={reservation.final_date}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2"
          />
        </>
      )}

      <label htmlFor="total_price" className="text-gray-700 font-bold">
        Precio total (€)
      </label>
      <input
        type="number"
        name="total_price"
        value={reservation.total_price}
        readOnly
        className="border border-gray-300 rounded-lg p-2 bg-gray-100"
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

export default ActivityReservationForm;
