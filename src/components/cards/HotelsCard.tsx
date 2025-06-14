import Link from "next/link";
import Buttons from "../../app/home/hotels/[id]/Buttons";

interface Hotel {
  id: number;
  namehotel: string;
  description: string;
  image: string;
}

function HotelsCard({ hotel }: { hotel: Hotel }) {
  if (!hotel) return null;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-sm">
      {hotel.image ? (
        <img
          src={`/uploads/hotels/${hotel.image}`}
          alt={hotel.namehotel || "Hotel"}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          Sin imagen
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            {hotel.namehotel || "Nombre no disponible"}
          </h2>
        </div>

        <p className="text-gray-600 text-sm mb-4">
          {hotel.description || "Descripción no disponible"}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <Link href={`/home/hotels/add/reservation/${hotel.id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Reservar
            </button>
          </Link>

          <Buttons id={hotel.id.toString()} />
        </div>
      </div>
    </div>
  );
}

export default HotelsCard;




/*
import Link from "next/link";
import Buttons from "../../app/home/hotels/[id]/Buttons";

interface Hotel {
  id: number;
  namehotel: string;
  description: string;
  image: string;
}

function HotelsCard({ hotel }: { hotel?: Hotel }) {
  if (!hotel) return null; // No renderiza nada si hotel es undefined

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-sm">
      {hotel.image ? (
        <img
          src={`/uploads/hotels/${hotel.image}`}
          alt={hotel.namehotel || "Hotel"}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          Sin imagen
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            {hotel.namehotel || "Nombre no disponible"}
          </h2>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {hotel.id ?? "?"}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4">
          {hotel.description || "Descripción no disponible"}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <Link href={`/home/hotels/add/reservation/${hotel.id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Reservar
            </button>
          </Link>

          <Buttons id={hotel.id.toString()} />
        </div>
      </div>
    </div>
  );
}

export default HotelsCard;

*/
