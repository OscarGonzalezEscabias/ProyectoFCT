import Buttons from "../../app/home/admin/aircrafts/[id]/Buttons";

function AircraftsCard({ aircrafts }: { aircrafts: any }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-2">
        <h2 className="font-bold text-xl">{aircrafts.model}</h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {aircrafts.id}
        </span>
      </div>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Numero de aerolínea:</span> {aircrafts.airline_id}
      </p>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Asientos:</span> {aircrafts.total_seats}
      </p>

      <div className="border-t border-gray-200 pt-4">
        <Buttons id={aircrafts.id} />
      </div>
    </div>
  );
}

export default AircraftsCard;
