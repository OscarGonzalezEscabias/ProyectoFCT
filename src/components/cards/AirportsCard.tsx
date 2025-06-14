import Buttons from "../../app/home/admin/airports/[id]/Buttons";

function AirportsCard({ airports }: { airports: any }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-2">
        <h2 className="font-bold text-xl">{airports.name}</h2>
      </div>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Codigo IATA:</span> {airports.iata_code}
      </p>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Ciudad:</span> {airports.city}
      </p>

      <p className="text-gray-700 mb-4">
        <span className="font-semibold">Pais:</span> {airports.country}
      </p>

      <div className="border-t border-gray-200 pt-4">
        <Buttons id={airports.id} />
      </div>
    </div>
  );
}

export default AirportsCard;
