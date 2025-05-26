"use client";

import axios from "axios";
import { useEffect, useState } from "react";

function FlightDetailCard({ flight }: { flight: any }) {
    const [airline, setAirline] = useState<any>(null);
    const [departureAirport, setDepartureAirport] = useState<any>(null);
    const [arrivalAirport, setArrivalAirport] = useState<any>(null);
    const [aircraft, setAircraft] = useState<any>(null);
    const [seats, setSeats] = useState<any[]>([]);

    useEffect(() => {
        async function fetchFlightDetails() {
            try {
                const [
                    airlineRes,
                    departureRes,
                    arrivalRes,
                    aircraftRes,
                    seatsRes
                ] = await Promise.all([
                    axios.get(`/api/airlines/${flight.airline_id}`),
                    axios.get(`/api/airports/${flight.departure_airport_id}`),
                    axios.get(`/api/airports/${flight.arrival_airport_id}`),
                    axios.get(`/api/aircrafts/${flight.aircraft_id}`),
                    axios.get(`/api/flights/${flight.id}/seats`)
                ]);
                
                setAirline(airlineRes.data);
                setDepartureAirport(departureRes.data);
                setArrivalAirport(arrivalRes.data);
                setAircraft(aircraftRes.data);
                setSeats(seatsRes.data);
            } catch (error) {
                console.error("Error cargando detalles del vuelo", error);
            }
        }
        fetchFlightDetails();
    }, [flight]);

    if (!airline || !departureAirport || !arrivalAirport || !aircraft) {
        return <div className="bg-white p-6 rounded-lg shadow-lg">Cargando detalles del vuelo...</div>;
    }

    const departureTime = new Date(flight.departure_time).toLocaleTimeString("es-ES", {
        hour: '2-digit',
        minute: '2-digit'
    });

    const arrivalTime = new Date(flight.arrival_time).toLocaleTimeString("es-ES", {
        hour: '2-digit',
        minute: '2-digit'
    });

    const flightDate = new Date(flight.departure_time).toLocaleDateString("es-ES", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const duration = Math.floor(
        (new Date(flight.arrival_time).getTime() - new Date(flight.departure_time).getTime()) / (1000 * 60)
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold">{airline.name}</h2>
                    <p className="text-gray-600">{flight.flight_number}</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-semibold">{flightDate}</p>
                    <p className="text-gray-600">{duration} minutos de duración</p>
                </div>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-3xl font-bold">{departureTime}</p>
                    <p className="text-xl">{departureAirport.city}</p>
                    <p className="text-gray-600">{departureAirport.name} ({departureAirport.iata_code})</p>
                </div>
                <div className="mx-4 text-gray-500 text-xl">→</div>
                <div className="text-right">
                    <p className="text-3xl font-bold">{arrivalTime}</p>
                    <p className="text-xl">{arrivalAirport.city}</p>
                    <p className="text-gray-600">{arrivalAirport.name} ({arrivalAirport.iata_code})</p>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Información del avión</h3>
                <p>Modelo: {aircraft.model}</p>
                <p>Capacidad total: {aircraft.total_seats} asientos</p>
                <p>Asientos disponibles: {flight.available_seats}</p>
            </div>

            <div>
                <h3 className="font-bold text-lg mb-2">Asientos disponibles</h3>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {seats.filter(s => s.is_available).map(seat => (
                        <div 
                            key={seat.id} 
                            className={`p-2 border rounded text-center 
                                ${seat.class === 'economy' ? 'bg-blue-100' : 
                                  seat.class === 'premium_economy' ? 'bg-green-100' : 
                                  seat.class === 'business' ? 'bg-purple-100' : 
                                  'bg-yellow-100'}`}
                        >
                            <p className="font-bold">{seat.seat_number}</p>
                            <p className="text-xs">{seat.class.replace('_', ' ')}</p>
                            <p className="text-sm">{(flight.base_price * seat.price_modifier).toFixed(2)} €</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FlightDetailCard;