import Buttons from "../app/home/flight_seats/[id]/Buttons";

function FlightSeatsCard({ flight_seatss }: { flight_seatss: any }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-2">
        <h2 className="font-bold text-xl">Asiento {flight_seatss.seat_number}</h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {flight_seatss.id}
        </span>
      </div>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">ID del vuelo:</span> {flight_seatss.flight_id}
      </p>

      <p className="text-gray-700 mb-1 capitalize">
        <span className="font-semibold">Clase:</span> {flight_seatss.class}
      </p>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Disponible:</span>{" "}
        {flight_seatss.is_available ? "Sí" : "No"}
      </p>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Multiplicador de precio:</span> {flight_seatss.price_modifier}
      </p>

      <div className="border-t border-gray-200 pt-4">
        <Buttons id={flight_seatss.id} />
      </div>
    </div>
  );
}

export default FlightSeatsCard;
