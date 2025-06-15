"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { TravelFlightReservationForm } from "./TravelFlightReservationForm";
import { TravelHotelReservationForm } from "./TravelHotelReservationForm";
import { TravelActivityReservationForm } from "./TravelActivityReservationForm";

interface TravelFormValues {
    name: string;
    description: string;
    outboundFlightReservationId: number;
    returnFlightReservationId: number;
    hotelReservationId: number;
    activityReservationIds: number[];
    totalPrice: number;
}

interface Flight {
    id: number;
    flight_number: string;
    base_price: number;
    departure_time: string;
    arrival_time: string;
}

interface Hotel {
    id: number;
    namehotel: string;
}

interface Activity {
    id: number;
    name: string;
    types: "RENTING" | "RESERVATION";
    price: number;
}

interface FlightReservationData {
    seatId: number | null;
    total_price: number;
}

interface HotelReservationData {
    checkIn: string;
    checkOut: string;
    roomId: number;
    total_price: number;
}

interface ActivityReservationData {
    initialDate: string;
    finalDate?: string;
    total_price: number;
}

function TravelCreatorPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const methods = useForm<TravelFormValues>({
        defaultValues: {
            name: "",
            description: "",
            outboundFlightReservationId: 0,
            returnFlightReservationId: 0,
            hotelReservationId: 0,
            activityReservationIds: [],
            totalPrice: 0,
        },
    });

    const { data: session } = useSession();
    const currentUser = session?.user as { id: number; role: "ADMIN" | "USER"; name: string; email: string };
    const [flights, setFlights] = useState<Flight[]>([]);
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedOutboundFlight, setSelectedOutboundFlight] = useState<Flight | null>(null);
    const [selectedReturnFlight, setSelectedReturnFlight] = useState<Flight | null>(null);
    const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
    const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);
    const [outboundFlightReservation, setOutboundFlightReservation] = useState<FlightReservationData>({
        seatId: null,
        total_price: 0,
    });

    const [returnFlightReservation, setReturnFlightReservation] = useState<FlightReservationData>({
        seatId: null,
        total_price: 0,
    });

    const [hotelReservation, setHotelReservation] = useState<HotelReservationData>({
        checkIn: new Date().toISOString().slice(0, 10),
        checkOut: new Date().toISOString().slice(0, 10),
        roomId: 0,
        total_price: 0,
    });

    const [activitiesReservationData, setActivitiesReservationData] = useState<Record<number, ActivityReservationData>>({});

    useEffect(() => {
        async function loadData() {
            const [flightsRes, hotelsRes, activitiesRes] = await Promise.all([
                axios.get("/api/flights"),
                axios.get("/api/hotels"),
                axios.get("/api/activities"),
            ]);

            function formatDateTime(dateStr: string): string {
                const date = new Date(dateStr);
                return date.toLocaleString("es-ES", {
                    dateStyle: "short",
                    timeStyle: "short",
                });
            }

            setFlights(flightsRes.data.map((flight: any) => ({
                ...flight,
                departure_time: formatDateTime(flight.departure_time),
                arrival_time: formatDateTime(flight.arrival_time),
            })));
            setHotels(hotelsRes.data);
            setActivities(activitiesRes.data);
        }
        loadData();
    }, [])

    const [outboundSeats, setOutboundSeats] = useState<any[]>([]);
    const [returnSeats, setReturnSeats] = useState<any[]>([]);
    const [hotelRooms, setHotelRooms] = useState<any[]>([]);

    // Cargar asientos cuando seleccionas un vuelo
    useEffect(() => {
        async function fetchSeats() {
            if (selectedOutboundFlight) {
                const res = await axios.get(`/api/flights/${selectedOutboundFlight.id}/seats`);
                setOutboundSeats(res.data);
            }
        }
        fetchSeats();
    }, [selectedOutboundFlight]);

    useEffect(() => {
        async function fetchSeats() {
            if (selectedReturnFlight) {
                const res = await axios.get(`/api/flights/${selectedReturnFlight.id}/seats`);
                setReturnSeats(res.data);
            }
        }
        fetchSeats();
    }, [selectedReturnFlight]);

    // Cargar habitaciones cuando se selecciona hotel
    useEffect(() => {
        async function fetchRooms() {
            if (selectedHotel) {
                const res = await axios.get(`/api/rooms/hotel/${selectedHotel.id}`);
                setHotelRooms(res.data);
            }
        }
        fetchRooms();
    }, [selectedHotel]);

    useEffect(() => {
        const hotelPrice = hotelReservation.total_price || 0;
        const outboundPrice = outboundFlightReservation.total_price || 0;
        const returnPrice = returnFlightReservation.total_price || 0;
        const activitiesPrice = Object.values(activitiesReservationData).reduce((acc, act) => acc + (act.total_price || 0), 0);
      
        const total = hotelPrice + outboundPrice + returnPrice + activitiesPrice;
      
        methods.setValue("totalPrice", total);
      }, [hotelReservation, outboundFlightReservation, returnFlightReservation, activitiesReservationData]);
      

    const onSubmit = async (data: TravelFormValues) => {
        try {
          const payload = {
            userId: currentUser.id,
            name: data.name,
            description: data.description,
            hotelReservation, 
            outboundFlight: selectedOutboundFlight ? {
              flightId: selectedOutboundFlight.id,
              seatId: outboundFlightReservation.seatId,
              total_price: outboundFlightReservation.total_price,
            } : null,
            returnFlight: selectedReturnFlight ? {
              flightId: selectedReturnFlight.id,
              seatId: returnFlightReservation.seatId,
              total_price: returnFlightReservation.total_price,
            } : null,
            activitiesReservationData, 
            totalPrice: data.totalPrice,
          };          
      
          const response = await fetch("/api/travels/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
      
          if (!response.ok) throw new Error("Error al crear el viaje");
      
          const result = await response.json();
          console.log("Viaje creado:", result.travelId);
      
          router.push("/home/travels");
        } catch (error) {
          console.error("Error al enviar el formulario:", error);
          alert("No se pudo crear el viaje. Inténtalo de nuevo.");
        }
      };
      


    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="p-6 flex flex-col gap-6 w-1/2 mx-auto"
            >
                <h2 className="text-xl font-bold">Paso {step + 1} de 6</h2>

                {step === 0 && <StepInfo />}
                {step === 1 && (
                    <>
                        <StepFlight
                            direction="ida"
                            flights={flights}
                            selectedFlight={selectedOutboundFlight}
                            setSelectedFlight={setSelectedOutboundFlight}
                        />
                        {selectedOutboundFlight && (
                            <TravelFlightReservationForm
                                flight={selectedOutboundFlight}
                                data={outboundFlightReservation}
                                setData={setOutboundFlightReservation}
                                seats={outboundSeats}
                            />
                        )}
                    </>
                )}
                {step === 2 && (
                    <>
                        <StepFlight
                            direction="vuelta"
                            flights={flights}
                            selectedFlight={selectedReturnFlight}
                            setSelectedFlight={setSelectedReturnFlight}
                        />
                        {selectedReturnFlight && (
                            <TravelFlightReservationForm
                                flight={selectedReturnFlight}
                                data={returnFlightReservation}
                                setData={setReturnFlightReservation}
                                seats={returnSeats}
                            />
                        )}
                    </>
                )}

                {step === 3 && (
                    <>
                        <StepHotel hotels={hotels} selectedHotel={selectedHotel} setSelectedHotel={setSelectedHotel} />
                        {selectedHotel && (
                            <TravelHotelReservationForm data={hotelReservation} setData={setHotelReservation} rooms={hotelRooms} />
                        )}
                    </>
                )}
                {step === 4 && (
                    <>
                        <StepActivities
                            activities={activities}
                            selectedActivities={selectedActivities}
                            setSelectedActivities={setSelectedActivities}
                        />
                        {selectedActivities.map((activity) => (
                            <TravelActivityReservationForm
                                key={activity.id}
                                activity={activity}
                                data={activitiesReservationData[activity.id]}
                                setData={(data) =>
                                    setActivitiesReservationData((prev) => ({
                                        ...prev,
                                        [activity.id]: data,
                                    }))
                                }
                            />
                        ))}
                    </>
                )}

                {step === 5 && (
                    <>
                        <StepSummary
                            selectedOutboundFlight={selectedOutboundFlight}
                            selectedReturnFlight={selectedReturnFlight}
                            outboundFlightReservation={outboundFlightReservation}
                            returnFlightReservation={returnFlightReservation}
                            selectedHotel={selectedHotel}
                            hotelReservation={hotelReservation}
                            hotelRooms={hotelRooms}
                            selectedActivities={selectedActivities}
                            activitiesReservationData={activitiesReservationData}
                            outboundSeats={outboundSeats}
                            returnSeats={returnSeats}
                        />
                        <button type="submit">Finalizar viaje</button>
                    </>
                )}

                <div className="flex justify-between">
                    {step > 0 && (
                        <button type="button" onClick={() => setStep((s) => s - 1)}>
                            Atrás
                        </button>
                    )}
                    {step < 5 && (
                        <button type="button" onClick={() => setStep((s) => s + 1)}>
                            Siguiente
                        </button>
                    )}

                </div>
            </form>
        </FormProvider>
    );
}

function StepInfo() {
    const { register } = useFormContext<TravelFormValues>();
    return (
        <>
            <input {...register("name", { required: true })} placeholder="Nombre del viaje" className="border p-2" />
            <textarea {...register("description")} placeholder="Descripción del viaje" className="border p-2" />
        </>
    );
}

function StepFlight({ direction, flights, selectedFlight, setSelectedFlight }: { direction: "ida" | "vuelta"; flights: Flight[]; selectedFlight: Flight | null; setSelectedFlight: (flight: Flight | null) => void }) {
    const { register } = useFormContext<TravelFormValues>();

    const handleFlightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const flightId = Number(e.target.value);
        const flight = flights.find((f) => f.id === flightId);
        setSelectedFlight(flight || null);
    };

    return (
        <>
            <label>Selecciona vuelo de {direction}</label>
            <select
                {...register(direction === "ida" ? "outboundFlightReservationId" : "returnFlightReservationId", {
                    required: true,
                })}
                onChange={handleFlightChange}
                className="border p-2"
            >
                <option value="">-- Elige un vuelo --</option>
                {flights.map((flight) => (
                    <option key={flight.id} value={flight.id}>
                        {flight.flight_number} ({flight.departure_time} → {flight.arrival_time})
                    </option>
                ))}
            </select>

            {selectedFlight && direction === "ida" && (
                <div>
                    <h2>IDA</h2>
                    <p>Seleccionado: {selectedFlight.flight_number}</p>
                    <p>Salida: {selectedFlight.departure_time}</p>
                    <p>Llegada: {selectedFlight.arrival_time}</p>
                    <p>Precio base: {selectedFlight.base_price}€</p>
                </div>
            )}
            {selectedFlight && direction === "vuelta" && (
                <div>
                    <h2>VUELTA</h2>
                    <p>Seleccionado: {selectedFlight.flight_number}</p>
                    <p>Salida: {selectedFlight.departure_time}</p>
                    <p>Llegada: {selectedFlight.arrival_time}</p>
                    <p>Precio base: {selectedFlight.base_price}€</p>
                </div>
            )}
        </>
    );
}

function StepHotel({ hotels, selectedHotel, setSelectedHotel }: { hotels: Hotel[]; selectedHotel: Hotel | null; setSelectedHotel: (hotel: Hotel | null) => void }) {
    const { register } = useFormContext<TravelFormValues>();

    const handleHotelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const hotelId = Number(e.target.value);
        const hotel = hotels.find((h) => h.id === hotelId);
        setSelectedHotel(hotel || null);
    };

    return (
        <>
            <label>Selecciona una reserva de hotel</label>
            <select {...register("hotelReservationId", { required: true })} onChange={handleHotelChange} className="border p-2">
                <option value="">-- Elige una reserva --</option>
                {hotels.map((hotel) => (
                    <option key={hotel.id} value={hotel.id}>
                        {hotel.namehotel}
                    </option>
                ))}
            </select>

            {selectedHotel && (
                <div>
                    <h2>Hotel</h2>
                    <p>Seleccionado: {selectedHotel.namehotel}</p>
                </div>
            )}
        </>
    );
}

function StepActivities({ activities, selectedActivities, setSelectedActivities }: { activities: Activity[]; selectedActivities: Activity[]; setSelectedActivities: (activities: Activity[]) => void }) {
    const { setValue } = useFormContext<TravelFormValues>();

    const handleActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const activityId = Number(e.target.value);
        const isChecked = e.target.checked;

        let updatedActivities: Activity[];
        if (isChecked) {
            const selected = activities.find((a) => a.id === activityId);
            updatedActivities = [...selectedActivities, selected!];
        } else {
            updatedActivities = selectedActivities.filter((a) => a.id !== activityId);
        }

        setSelectedActivities(updatedActivities);
        setValue(
            "activityReservationIds",
            updatedActivities.map((a) => a.id)
        );
    };

    return (
        <>
            <label>Selecciona actividades (opcional)</label>
            <div className="flex flex-col gap-2">
                {activities.map((activity) => (
                    <label key={activity.id}>
                        <input
                            type="checkbox"
                            value={activity.id}
                            checked={selectedActivities.some((a) => a.id === activity.id)}
                            onChange={handleActivityChange}
                        />
                        {activity.name}
                    </label>
                ))}
            </div>
        </>
    );
}

function StepSummary({
    selectedOutboundFlight,
    selectedReturnFlight,
    outboundFlightReservation,
    returnFlightReservation,
    selectedHotel,
    hotelReservation,
    hotelRooms,
    outboundSeats,
    returnSeats,
    selectedActivities,
    activitiesReservationData,
}: {
    selectedOutboundFlight: Flight | null;
    selectedReturnFlight: Flight | null;
    outboundFlightReservation: FlightReservationData;
    returnFlightReservation: FlightReservationData;
    selectedHotel: Hotel | null;
    hotelReservation: HotelReservationData & { roomId?: number };
    hotelRooms: any[];
    outboundSeats: any[];
    returnSeats: any[];
    selectedActivities: Activity[];
    activitiesReservationData: Record<number, ActivityReservationData>;
}) {
    // Vuelo
    const flightTotal =
        (selectedOutboundFlight && outboundFlightReservation.seatId)
            ? selectedOutboundFlight.base_price *
            (getSeatModifier(outboundFlightReservation.seatId, 'outbound'))
            : 0;

    const returnFlightTotal =
        (selectedReturnFlight && returnFlightReservation.seatId)
            ? selectedReturnFlight.base_price *
            (getSeatModifier(returnFlightReservation.seatId, 'return'))
            : 0;

    // Hotel
    const nights =
        (new Date(hotelReservation.checkOut).getTime() -
            new Date(hotelReservation.checkIn).getTime()) /
        (1000 * 60 * 60 * 24);

    const selectedRoom = hotelRooms.find(r => r.id === hotelReservation.roomId);
    const hotelTotal = selectedRoom && nights > 0 ? selectedRoom.price * nights : 0;

    // Actividades
    const activitiesTotal = selectedActivities.reduce((sum, activity) => {
        const resData = activitiesReservationData[activity.id];
        if (!resData || !resData.initialDate) return sum;
        const start = new Date(resData.initialDate);
        const end = resData.finalDate ? new Date(resData.finalDate) : start;
        const days = activity.types === 'RENTING' ? Math.max(1, (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) : 1;
        return sum + activity.price * days;
    }, 0);

    const total = flightTotal + returnFlightTotal + hotelTotal + activitiesTotal;

    // Acceso a los asientos por id
    function getSeatModifier(seatId: number, direction: 'outbound' | 'return') {
        const seatList = direction === 'outbound' ? outboundSeats : returnSeats;
        const seat = seatList.find((s: any) => s.id === seatId);
        return seat ? seat.price_modifier : 1;
    }

    return (
        <div className="space-y-2 text-sm text-gray-800">
            <h2 className="text-xl font-bold mb-4">Resumen de tu viaje</h2>

            {/* Vuelos */}
            <div>
                <h3 className="text-lg font-semibold">Vuelo de ida</h3>
                {selectedOutboundFlight ? (
                    <>
                        <p>Fecha: {new Date(selectedOutboundFlight.departure_time).toLocaleDateString()}</p>
                        <p>Asiento seleccionado: {outboundSeats.map(seat => seat.id === outboundFlightReservation.seatId ? seat.seat_number : '').join(', ') || 'Ninguno'}</p>
                        <p>Precio total: {flightTotal.toFixed(2)}€</p>
                    </>
                ) : (
                    <p>No se ha seleccionado vuelo de ida.</p>
                )}
            </div>

            <div>
                <h3 className="text-lg font-semibold">Vuelo de vuelta</h3>
                {selectedReturnFlight ? (
                    <>
                        <p>Fecha: {new Date(selectedReturnFlight.departure_time).toLocaleDateString()}</p>
                        <p>Asientos seleccionados: {returnSeats.map(seat => seat.id === returnFlightReservation.seatId ? seat.seat_number : '').join(', ') || 'Ninguno'}</p>
                        <p>Precio total: {returnFlightTotal.toFixed(2)}€</p>
                    </>
                ) : (
                    <p>No se ha seleccionado vuelo de vuelta.</p>
                )}
            </div>

            {/* Hotel */}
            <div>
                <h3 className="text-lg font-semibold">Hotel</h3>
                {selectedHotel ? (
                    <>
                        <p>{selectedHotel.namehotel} ({nights} noche{nights !== 1 ? 's' : ''})</p>
                        <p>Fecha de entrada: {hotelReservation.checkIn}</p>
                        <p>Fecha de salida: {hotelReservation.checkOut}</p>
                        <p>Precio total: {hotelTotal.toFixed(2)}€</p>
                    </>
                ) : (
                    <p>No se ha seleccionado hotel.</p>
                )}
            </div>

            {/* Actividades */}
            <div>
                <h3 className="text-lg font-semibold">Actividades</h3>
                {selectedActivities.length > 0 ? (
                    <>
                        <ul className="list-disc list-inside">
                            {selectedActivities.map(activity => (
                                <div key={activity.id}>
                                    <p>{activity.name}</p>
                                    <p>{activitiesReservationData[activity.id]?.initialDate || 0} - {activitiesReservationData[activity.id]?.finalDate || 0}</p>
                                </div>
                            ))}
                        </ul>
                        <p>Precio total: {activitiesTotal.toFixed(2)}€</p>
                    </>
                ) : (
                    <p>No se han seleccionado actividades.</p>
                )}
            </div>

            <hr className="my-2" />

            {/* Total */}
            <p className="text-lg font-bold">Total estimado: {total.toFixed(2)}€</p>
        </div>
    );

}

export default TravelCreatorPage;