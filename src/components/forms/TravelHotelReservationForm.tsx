"use client";

import React, { useEffect, useState } from "react";

interface HotelReservationData {
    checkIn: string;
    checkOut: string;
    roomId: number;
    total_price: number;
}

export function TravelHotelReservationForm({
    data,
    setData,
    rooms,
}: {
    data: HotelReservationData & { roomId?: number };
    setData: React.Dispatch<React.SetStateAction<HotelReservationData & { roomId?: number }>>;
    rooms: any[];
}) {
    const [selectedRoom, setSelectedRoom] = useState<any | null>(null);

    const nights =
        (new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) /
        (1000 * 60 * 60 * 24);

    useEffect(() => {
        const room = rooms.find(r => r.id === data.roomId);
        setSelectedRoom(room || null);
    }, [data.roomId, rooms]);

    const finalPrice = selectedRoom && nights > 0 ? (selectedRoom.price * nights) : 0;

    useEffect(() => {
        if (selectedRoom && nights > 0) {
          setData(prevData => ({
            ...prevData,
            total_price: selectedRoom.price * nights,
          }));
        } else {
          setData(prevData => ({
            ...prevData,
            total_price: 0,
          }));
        }
      }, [selectedRoom, nights, setData]);
      
      

    return (
        <div className="border p-4 rounded my-4 bg-gray-50">
            <h3>Detalles reserva hotel</h3>

            <label className="block mt-2 font-semibold">Fecha entrada</label>
            <input
                type="date"
                value={data.checkIn}
                onChange={(e) => setData({ ...data, checkIn: e.target.value })}
                className="border p-2 rounded w-full"
                required
            />

            <label className="block mt-2 font-semibold">Fecha salida</label>
            <input
                type="date"
                value={data.checkOut}
                onChange={(e) => setData({ ...data, checkOut: e.target.value })}
                className="border p-2 rounded w-full"
                required
            />

            <label className="block mt-2 font-semibold">Selecciona habitación</label>
            <select
                value={data.roomId || ""}
                onChange={(e) => setData({ ...data, roomId: Number(e.target.value) })}
                className="border p-2 rounded w-full"
                required
            >
                <option value="">-- Elige una habitación --</option>
                {rooms.map(room => (
                    <option key={room.id} value={room.id}>
                        {room.name} - {room.capacity} personas - {room.price}€/noche
                    </option>
                ))}
            </select>

            {selectedRoom && nights > 0 && (
                <>
                    <p className="mt-2">Precio total ({nights} noches): {(selectedRoom.price * nights).toFixed(2)}€</p>
                </>
            )}
        </div>
    );
}