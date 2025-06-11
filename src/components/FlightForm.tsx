"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface User {
  id: number;
  username: string;
}

interface FlightData {
  id?: number;
  flight_number: string;
  airline_id: number | "";
  aircraft_id: number | "";
  departure_airport_id: number | "";
  arrival_airport_id: number | "";
  departure_time: string;
  arrival_time: string;
  base_price: number;
}

interface SeatData {
  id?: number;
  seat_number: string;
  class: string;
  is_available: boolean;
  price_modifier: number;
}

interface FlightFormProps {
  mode: "create" | "edit" | "reserve";
  initialData?: FlightData;
  flightId?: string;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
}

function FlightForm({ mode, initialData, flightId, onSubmit, onCancel }: FlightFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FlightData>(initialData || {
    flight_number: "",
    airline_id: "",
    aircraft_id: "",
    departure_airport_id: "",
    arrival_airport_id: "",
    departure_time: "",
    arrival_time: "",
    base_price: 0,
  });

  // Datos para reservas
  const { data: session, status } = useSession();
  const currentUser = session?.user as { id: number; role: string; name: string };
  const [users, setUsers] = useState<User[]>([]);
  const [seats, setSeats] = useState<SeatData[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<SeatData | null>(null);
  const [reservationData, setReservationData] = useState({
    user_id: "",
    seat_id: "",
    total_price: 0,
  });

  // Datos para selección
  const [airlines, setAirlines] = useState<any[]>([]);
  const [airports, setAirports] = useState<any[]>([]);
  const [aircrafts, setAircrafts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);

        if (mode === "reserve") {
          const [usersRes, flightRes, seatsRes] = await Promise.all([
            axios.get("/api/users"),
            axios.get(`/api/flights/${flightId}`),
            axios.get(`/api/flights/${flightId}/seats`),
          ]);

          setUsers(usersRes.data);
          setFormData(flightRes.data);
          setSeats(seatsRes.data);

          // Asigna automáticamente el user_id si no es admin
          if (currentUser?.role !== "ADMIN") {
            setReservationData(prev => ({
              ...prev,
              user_id: currentUser?.id.toString() || ""
            }));
          }
        } else {
          const [airlinesRes, airportsRes, aircraftsRes] = await Promise.all([
            axios.get("/api/airlines"),
            axios.get("/api/airports"),
            axios.get("/api/aircrafts"),
          ]);
          setAirlines(airlinesRes.data);
          setAirports(airportsRes.data);
          setAircrafts(aircraftsRes.data);

          if (mode === "edit" && initialData) {
            setFormData(initialData);
          }
        }
      } catch (error) {
        console.error("Error loading data", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (status === "authenticated") {
      loadData();
    }
  }, [mode, flightId, initialData, status, currentUser]);


  const handleFlightChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "base_price" ? parseFloat(value) || 0 : value
    }));
  };

  const handleSeatSelection = (seat: SeatData) => {
    setSelectedSeat(seat);
    setReservationData({
      user_id: reservationData.user_id,
      seat_id: seat.id?.toString() || "",
      total_price: formData.base_price * seat.price_modifier
    });
  };

  const handleReservationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReservationData(prev => ({
      ...prev,
      [name]: value,
      total_price: selectedSeat ? formData.base_price * selectedSeat.price_modifier : 0
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "reserve") {
      if (!reservationData.user_id || !reservationData.seat_id) {
        alert("Por favor completa todos los campos");
        return;
      }
      onSubmit({
        ...reservationData,
        flight_id: flightId,
      });
    } else {
      onSubmit(formData);
    }
  };

  if (isLoading) return <div className="text-center py-8">Cargando...</div>;

  if (mode === "reserve") {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {currentUser?.role === "ADMIN" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Pasajero</label>
            <select
              name="user_id"
              value={reservationData.user_id}
              onChange={handleReservationChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Selecciona un pasajero</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.username}</option>
              ))}
            </select>
          </div>
        )}


        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-3">Asientos disponibles</h2>
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
                <p className="text-sm">{(formData.base_price * seat.price_modifier).toFixed(2)} €</p>
              </button>
            ))}
          </div>
        </div>

        {selectedSeat && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-2">Resumen</h3>
            <p>Asiento: {selectedSeat.seat_number} ({selectedSeat.class.replace('_', ' ')})</p>
            <p>Precio: {(formData.base_price * selectedSeat.price_modifier).toFixed(2)} €</p>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!selectedSeat}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Confirmar Reserva
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Número de vuelo</label>
          <input
            type="text"
            name="flight_number"
            value={formData.flight_number}
            onChange={handleFlightChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Aerolínea</label>
          <select
            name="airline_id"
            value={formData.airline_id}
            onChange={handleFlightChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Seleccionar aerolínea</option>
            {airlines.map(airline => (
              <option key={airline.id} value={airline.id}>{airline.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Avión</label>
          <select
            name="aircraft_id"
            value={formData.aircraft_id}
            onChange={handleFlightChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Seleccionar avión</option>
            {aircrafts.map(aircraft => (
              <option key={aircraft.id} value={aircraft.id}>{aircraft.model}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Aeropuerto de salida</label>
          <select
            name="departure_airport_id"
            value={formData.departure_airport_id}
            onChange={handleFlightChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Seleccionar aeropuerto</option>
            {airports.map(airport => (
              <option key={airport.id} value={airport.id}>
                {airport.name} ({airport.iata_code})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Aeropuerto de llegada</label>
          <select
            name="arrival_airport_id"
            value={formData.arrival_airport_id}
            onChange={handleFlightChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Seleccionar aeropuerto</option>
            {airports.map(airport => (
              <option key={airport.id} value={airport.id}>
                {airport.name} ({airport.iata_code})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha y hora de salida</label>
          <input
            type="datetime-local"
            name="departure_time"
            value={formData.departure_time}
            onChange={handleFlightChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha y hora de llegada</label>
          <input
            type="datetime-local"
            name="arrival_time"
            value={formData.arrival_time}
            onChange={handleFlightChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Precio base (€)</label>
          <input
            type="number"
            name="base_price"
            value={formData.base_price}
            onChange={handleFlightChange}
            min="0"
            step="0.01"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel || (() => router.back())}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {mode === "create" ? "Crear Vuelo" : "Actualizar Vuelo"}
        </button>
      </div>
    </form>
  );
}

export default FlightForm;