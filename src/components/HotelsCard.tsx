import Link from "next/link";
import Buttons from "../app/home/hotels/[id]/Buttons"; // Asegúrate de que la ruta es correcta

function HotelsCard({ hotels }: { hotels: any }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-3 hover:bg-gray-100 margin-2 items-center">
      <h2 className="font-bold text-2xl">{hotels.namehotel}</h2>
      <p className="text-gray-500">{hotels.description}</p>

      <div className="flex gap-2 mt-2">
        <Link href={`/home/admin/reservation/add`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Reservar
          </button>
        </Link>

        <Buttons id={hotels.id} />
      </div>
    </div>
  );
}

export default HotelsCard;
