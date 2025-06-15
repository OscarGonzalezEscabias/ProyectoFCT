import { useEffect, useState } from "react";

interface Flight {
    id: number;
    flight_number: string;
    base_price: number;
    departure_time: string;
    arrival_time: string;
}

interface FlightReservationData {
    seatId: number | null;
    total_price: number;
}

export function TravelFlightReservationForm({
    flight,
    data,
    setData,
    seats,
}: {
    flight: Flight;
    data: FlightReservationData;
    setData: React.Dispatch<React.SetStateAction<FlightReservationData>>;
    seats: any[];
}) {
    const [selectedSeat, setSelectedSeat] = useState<any | null>(null);

    useEffect(() => {
        const seat = seats.find(s => s.id === data.seatId);
        setSelectedSeat(seat || null);
    }, [data.seatId, seats]);

    const finalPrice = selectedSeat ? flight.base_price * selectedSeat.price_modifier : null;

    useEffect(() => {
        if (selectedSeat && finalPrice) {
          setData((prevData: any) => ({
            ...prevData,
            total_price: finalPrice,
          }));
        } else {
          setData((prevData: any) => ({
            ...prevData,
            total_price: 0,
          }));
        }
      }, [selectedSeat, finalPrice, setData]);
      

    return (
        <div className="border p-4 rounded my-4 bg-gray-50">
            <h3>Reserva vuelo: {flight.flight_number}</h3>

            <label className="block mt-2 font-semibold">Selecciona asiento</label>
            <select
                value={data.seatId || ""}
                onChange={(e) => setData({ ...data, seatId: Number(e.target.value) })}
                className="border p-2 rounded w-full"
                required
            >
                <option value="">-- Elige un asiento --</option>
                {seats.map((seat) => (
                    <option key={seat.id} value={seat.id}>
                        {seat.seat_number} ({seat.class}) x{seat.price_modifier}
                    </option>
                ))}
            </select>

            {selectedSeat && (
                <p className="mt-2">Precio total: {(flight.base_price * selectedSeat.price_modifier).toFixed(2)}€</p>
            )}
        </div>
    );
}