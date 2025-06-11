"use client";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

interface User {
    id: number;
    username: string;
}

interface Room {
    id: number;
    name: string;
    price: number;
}

interface Reservation {
    user_id: number | "";
    room_id: number | "";
    check_in: string;
    check_out: string;
    total_price: number;
}

function ReservationForm() {
    const [reservation, setReservation] = useState<Reservation>({
        user_id: "",
        room_id: "",
        check_in: "",
        check_out: "",
        total_price: 0,
    });

    const [users, setUsers] = useState<User[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);

    const router = useRouter();
    const params = useParams();
    const form = useRef<HTMLFormElement>(null);

    useEffect(() => {
        async function fetchUsersRooms() {
            try {
                const [usersRes, roomsRes] = await Promise.all([
                    axios.get("/api/users"),
                    axios.get("/api/rooms"),
                ]);
                setUsers(usersRes.data);
                setRooms(roomsRes.data);
            } catch (error) {
                console.error("Error cargando usuarios o habitaciones", error);
            }
        }
        fetchUsersRooms();
    }, []);

    useEffect(() => {
        if (params.id) {
            axios
                .get(`/api/reservation/${params.id}`)
                .then((res) => {
                    const data = res.data;
                    setReservation({
                        user_id: data.user_id,
                        room_id: data.room_id,
                        check_in: data.check_in,
                        check_out: data.check_out,
                        total_price: Number(data.total_price),
                    });
                })
                .catch(() => {
                    alert("Error al cargar la reserva");
                });
        }
    }, [params.id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setReservation((prev) => {
            const updated = { ...prev, [name]: value };

            if (
                (name === "room_id" || name === "check_in" || name === "check_out") &&
                updated.room_id &&
                updated.check_in &&
                updated.check_out
            ) {
                const room = rooms.find((r) => r.id === Number(updated.room_id));
                if (room) {
                    const checkInDate = new Date(updated.check_in);
                    const checkOutDate = new Date(updated.check_out);
                    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    if (diffDays > 0) {
                        updated.total_price = diffDays * room.price;
                    }
                }
            }

            return updated;
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !reservation.user_id ||
            !reservation.room_id ||
            !reservation.check_in ||
            !reservation.check_out
        ) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const payload = {
            ...reservation,
            user_id: Number(reservation.user_id),
            room_id: Number(reservation.room_id),
            total_price: Number(reservation.total_price),
        };

        try {
            if (params.id) {
                console.log(payload)
                const response = await axios.put(`/api/reservation/edit/${params.id}`, payload);
                console.log(response)
            } else {
                console.log(payload)
                const response = await axios.post("/api/reservation/add", payload);
                console.log(response)
            }
            form.current?.reset();
            router.push("/home/admin/reservation");
        } catch (error) {
            alert("Error al guardar la reserva");
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
                id="user_id"
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

            <label htmlFor="room_id" className="text-gray-700 font-bold">
                Habitación
            </label>
            <select
                name="room_id"
                id="room_id"
                value={reservation.room_id}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2"
                required
            >
                <option value="">Selecciona una habitación</option>
                {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                        {room.name} - {room.price} €
                    </option>
                ))}
            </select>

            <label htmlFor="check_in" className="text-gray-700 font-bold">
                Fecha de entrada
            </label>
            <input
                type="date"
                name="check_in"
                id="check_in"
                value={reservation.check_in}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2"
                required
            />

            <label htmlFor="check_out" className="text-gray-700 font-bold">
                Fecha de salida
            </label>
            <input
                type="date"
                name="check_out"
                id="check_out"
                value={reservation.check_out}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2"
                required
            />

            <label htmlFor="total_price" className="text-gray-700 font-bold">
                Precio total (€)
            </label>
            <input
                type="number"
                name="total_price"
                id="total_price"
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

export default ReservationForm;
