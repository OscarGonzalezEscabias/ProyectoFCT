"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

function FlightCard({ flight }: { flight: any }) {
    const [airline, setAirline] = useState<string>("Cargando...");
    const [departureAirport, setDepartureAirport] = useState<string>("Cargando...");
    const [arrivalAirport, setArrivalAirport] = useState<string>("Cargando...");

    useEffect(() => {
        async function fetchFlightDetails() {
            try {
                const [airlineRes, departureRes, arrivalRes] = await Promise.all([
                    axios.get(`http://localhost:3000/api/airlines/${flight.airline_id}`),
                    axios.get(`http://localhost:3000/api/airports/${flight.departure_airport_id}`),
                    axios.get(`http://localhost:3000/api/airports/${flight.arrival_airport_id}`)
                ]);
                
                setAirline(airlineRes.data?.name || "Aerolínea no encontrada");
                setDepartureAirport(departureRes.data?.city || "Origen no encontrado");
                setArrivalAirport(arrivalRes.data?.city || "Destino no encontrado");
            } catch {
                setAirline("Error al cargar datos");
                setDepartureAirport("Error al cargar datos");
                setArrivalAirport("Error al cargar datos");
            }
        }
        fetchFlightDetails();
    }, [flight]);

    const departureTime = new Date(flight.departure_time).toLocaleTimeString("es-ES", {
        hour: '2-digit',
        minute: '2-digit'
    });

    const arrivalTime = new Date(flight.arrival_time).toLocaleTimeString("es-ES", {
        hour: '2-digit',
        minute: '2-digit'
    });

    const flightDate = new Date(flight.departure_time).toLocaleDateString("es-ES", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Link
            href={`/home/flights/${flight.id}`}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
            <div className="flex justify-between items-start mb-4">
                <h2 className="font-bold text-xl">{airline}</h2>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {flight.flight_number}
                </span>
            </div>

            <div className="flex items-center justify-between mb-2">
                <div>
                    <p className="text-2xl font-bold">{departureTime}</p>
                    <p className="text-gray-600">{departureAirport}</p>
                </div>
                <div className="mx-4 text-gray-500">→</div>
                <div>
                    <p className="text-2xl font-bold">{arrivalTime}</p>
                    <p className="text-gray-600">{arrivalAirport}</p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-500">
                    <span className="font-bold text-black">Fecha:</span> {flightDate}
                </p>
                <p className="text-gray-500">
                    <span className="font-bold text-black">Asientos disponibles:</span> {flight.available_seats}
                </p>
                <p className="text-lg font-bold mt-2 text-right">
                    Desde {flight.base_price} €
                </p>
            </div>
        </Link>
    );
}

export default FlightCard;