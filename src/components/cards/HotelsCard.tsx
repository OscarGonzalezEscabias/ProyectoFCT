import Link from "next/link";
import Buttons from "../../app/home/hotels/[id]/Buttons";

function HotelsCard({ hotels }: { hotels: any }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {hotels.image && (
        <img
          src={`/images/hotels/${hotels.image}`}
          alt={hotels.namehotel}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            {hotels.namehotel}
          </h2>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {hotels.id}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4">{hotels.description}</p>

        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <Link href={`/home/hotels/add/reservation/${hotels.id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Reservar
            </button>
          </Link>

          <Buttons id={hotels.id} />
        </div>
      </div>
    </div>
  );
}

export default HotelsCard;
