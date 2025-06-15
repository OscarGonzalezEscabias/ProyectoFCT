import Link from "next/link";

export default function TravelsCard({ travel }: { travel: any }) {
    return (
        <Link
            href={`/home/admin/travels/${travel.id}`}
            className="bg-white p-4 rounded-lg shadow-lg mb-3 hover:bg-gray-100 margin-2 items-center"
        >
            <h2 className="font-bold text-2xl">{travel.name}</h2>

            <p className="text-gray-500">
                <span className="font-bold text-black">Descripción:</span> {travel.description}
            </p>

            <p className="text-gray-500">
                <span className="font-bold text-black">Fecha de inicio:</span> {new Date(travel.outboundFlight.departure_time).toLocaleDateString("es-ES")}
            </p>
            <p className="text-gray-500">
                <span className="font-bold text-black">Fecha de fin:</span> {new Date(travel.returnFlight.arrival_time).toLocaleDateString("es-ES")}
            </p>

            <div className="mt-2">
                <span className="text-lg font-semibold text-blue-600">
                    Precio total: {Number(travel.total_price).toFixed(2)} €
                </span>
            </div>
        </Link>
    );
}