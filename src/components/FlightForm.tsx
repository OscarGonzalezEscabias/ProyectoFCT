"use client";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

interface User {
  id: number;
  username: string;
}

interface FlightReservation {
  user_id: number | "";
  flight_id: number | "";
  seat_id: number | "";
  total_price: number;
}

interface FlightFormProps {
  flightId: string;
  onSubmit: (reservation: FlightReservation) => void;
}

function FlightForm({ flightId, onSubmit }: FlightFormProps) {
  const [reservation, setReservation] = useState<FlightReservation>({
    user_id: "",
    flight_id: Number(flightId),
    seat_id: "",
    total_price: 0,
  });

  const [users, setUsers] = useState<User[]>([]);
  const [flight, setFlight] = useState<any>(null);
  const [seats, setSeats] = useState<any[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [usersRes, flightRes, seatsRes] = await Promise.all([
          axios.get("/api/users"),
          axios.get(`/api/flights/${flightId}`),
          axios.get(`/api/flights/${flightId}/seats`),
        ]);
        
        setUsers(usersRes.data);
        setFlight(flightRes.data);
        setSeats(seatsRes.data);
      } catch (error) {
        console.error("Error cargando datos", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [flightId]);

  const handleSeatSelection = (seat: any) => {
    setSelectedSeat(seat);
    setReservation({
      ...reservation,
      seat_id: seat.id,
      total_price: flight.base_price * seat.price_modifier
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(reservation);
  };

  if (isLoading) return <div className="text-center py-8">Cargando...</div>;

  return (
    <form onSubmit={handleSubmit} ref={form} className="space-y-6">
      <div>
        <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
          Pasajero
        </label>
        <select
          name="user_id"
          id="user_id"
          value={reservation.user_id}
          onChange={(e) => setReservation({ ...reservation, user_id: e.target.value as any })}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
          required
        >
          <option value="">Selecciona un pasajero</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-3">Selecciona un asiento</h2>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-4">
          {seats.filter(s => s.is_available).map(seat => (
            <button
              key={seat.id}
              type="button"
              onClick={() => handleSeatSelection(seat)}
              className={`p-2 border rounded text-center cursor-pointer transition-all
                ${selectedSeat?.id === seat.id ? 'ring-2 ring-blue-500' : ''}
                ${seat.class === 'economy' ? 'bg-blue-100 hover:bg-blue-200' : 
                  seat.class === 'premium_economy' ? 'bg-green-100 hover:bg-green-200' : 
                  seat.class === 'business' ? 'bg-purple-100 hover:bg-purple-200' : 
                  'bg-yellow-100 hover:bg-yellow-200'}`}
            >
              <p className="font-bold">{seat.seat_number}</p>
              <p className="text-xs capitalize">{seat.class.replace('_', ' ')}</p>
              <p className="text-sm">{(flight.base_price * seat.price_modifier).toFixed(2)} €</p>
            </button>
          ))}
        </div>
      </div>

      {selectedSeat && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-gray-800 mb-2">Resumen de tu selección</h3>
          <p className="text-gray-700"><span className="font-semibold">Asiento:</span> {selectedSeat.seat_number} ({selectedSeat.class.replace('_', ' ')})</p>
          <p className="text-gray-700"><span className="font-semibold">Precio:</span> {(flight.base_price * selectedSeat.price_modifier).toFixed(2)} €</p>
        </div>
      )}

      <div>
        <label htmlFor="total_price" className="block text-sm font-medium text-gray-700">
          Precio Total
        </label>
        <input
          type="number"
          name="total_price"
          id="total_price"
          value={reservation.total_price}
          readOnly
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border bg-gray-100"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
        disabled={!selectedSeat}
      >
        Confirmar Reserva
      </button>
    </form>
  );
}

export default FlightForm;