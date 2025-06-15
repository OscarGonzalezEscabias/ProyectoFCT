import Link from "next/link";

export default function TravelsCard({ reservation }: { reservation: any }) {
    return (
        <Link
            href={`/home/profile/${reservation.user_id}/my-reservations/travels-reservation/${reservation.id}`}
            className="bg-white p-4 rounded-lg shadow-lg mb-3 hover:bg-gray-100 margin-2 items-center"
        >
            <h2 className="font-bold text-2xl">{reservation.name}</h2>

            <p className="text-gray-500">
                <span className="font-bold text-black">Descripción:</span> {reservation.description}
            </p>

            <p className="text-gray-500">
                <span className="font-bold text-black">Fecha de inicio:</span> {new Date(reservation.outboundFlight.departure_time).toLocaleDateString("es-ES")}
            </p>
            <p className="text-gray-500">
                <span className="font-bold text-black">Fecha de fin:</span> {new Date(reservation.returnFlight.arrival_time).toLocaleDateString("es-ES")}
            </p>

            <div className="mt-2">
                <span className="text-lg font-semibold text-blue-600">
                    Precio total: {Number(reservation.total_price).toFixed(2)} €
                </span>
            </div>
        </Link>
    );
}