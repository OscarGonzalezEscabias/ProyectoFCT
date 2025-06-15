import React from "react";

export default function TravelDetailCard({ travel }: { travel: any }) {

  return (
    <div className="w-full max-w-xl space-y-4">
      <h2 className="text-2xl font-bold text-center">{travel.name}</h2>

      <p className="text-gray-700">
        <span className="font-semibold">Descripción:</span> {travel.description}
      </p>

      <div className="border-t pt-4 space-y-2">
        <h3 className="font-semibold text-lg">Vuelo de ida</h3>
        {travel.outboundFlight ? (
          <div className="text-sm text-gray-600">
            <p><span className="font-medium">Origen:</span> {travel.outboundFlight.departure_airport_name}</p>
            <p><span className="font-medium">Destino:</span> {travel.outboundFlight.arrival_airport_name}</p>
            <p><span className="font-medium">Salida:</span> {new Date(travel.outboundFlight.departure_time).toLocaleString("es-ES")}</p>
            <p><span className="font-medium">Precio:</span> {Number(travel.outboundFlight.base_price).toFixed(2)} €</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No se ha reservado vuelo de ida.</p>
        )}
      </div>

      <div className="border-t pt-4 space-y-2">
        <h3 className="font-semibold text-lg">Vuelo de vuelta</h3>
        {travel.returnFlight ? (
          <div className="text-sm text-gray-600">
            <p><span className="font-medium">Origen:</span> {travel.returnFlight.departure_airport_name}</p>
            <p><span className="font-medium">Destino:</span> {travel.returnFlight.arrival_airport_name}</p>
            <p><span className="font-medium">Llegada:</span> {new Date(travel.returnFlight.arrival_time).toLocaleString("es-ES")}</p>
            <p><span className="font-medium">Precio:</span> {Number(travel.returnFlight.base_price).toFixed(2)} €</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No se ha reservado vuelo de vuelta.</p>
        )}
      </div>

      <div className="border-t pt-4 space-y-2">
        <h3 className="font-semibold text-lg">Hotel</h3>
        {travel.hotelReservation ? (
          <div className="text-sm text-gray-600">
            <p><span className="font-medium">Check-in:</span> {new Date(travel.hotelReservation.check_in).toLocaleDateString("es-ES")}</p>
            <p><span className="font-medium">Check-out:</span> {new Date(travel.hotelReservation.check_out).toLocaleDateString("es-ES")}</p>
            <p><span className="font-medium">Precio:</span> {Number(travel.hotelReservation.total_price).toFixed(2)} €</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No hay hotel reservado.</p>
        )}
      </div>

      <div className="border-t pt-4 space-y-2">
        <h3 className="font-semibold text-lg">Actividades</h3>
        {travel.activities?.length > 0 ? (
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {travel.activities.map((activity: any, index: number) => (
              <li key={index}>
                <span className="font-medium">{activity.name}</span> – del{" "}
                {new Date(activity.initial_date).toLocaleDateString("es-ES")} al{" "}
                {activity.final_date
                  ? new Date(activity.final_date).toLocaleDateString("es-ES")
                  : "fecha no especificada"} –{" "}
                {Number(activity.total_price).toFixed(2)} €
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No hay actividades reservadas.</p>
        )}
      </div>

      <div className="border-t pt-4 text-lg font-semibold text-blue-600">
        Precio total: {Number(travel.total_price).toFixed(2)} €
      </div>
    </div>
  );
}
