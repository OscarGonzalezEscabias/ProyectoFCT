import Link from "next/link";
import Buttons from "../../app/home/activities/[id]/Buttons";

function AcitivitiesCard({ activities }: { activities: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full max-w-md">
      {activities.image && (
        <img
          src={`/images/activities/${activities.image}`}
          alt={activities.name}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{activities.name}</h2>
            <span
              className={`text-xs font-medium mt-1 inline-block px-2 py-1 rounded ${
                activities.types === "RENTING"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {activities.types === "RENTING" ? "Alquiler" : "Reserva"}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{activities.description}</p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium text-blue-600">
            {Number(activities.price).toFixed(2)} €
          </span>
          <span
            className={`text-sm font-semibold ${
              activities.available ? "text-green-600" : "text-red-500"
            }`}
          >
            {activities.available ? "Disponible" : "No disponible"}
          </span>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <Link href={`/home/activities/book`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Reservar
            </button>
          </Link>

          <Buttons id={activities.id} />
        </div>
      </div>
    </div>
  );
}

export default AcitivitiesCard;
