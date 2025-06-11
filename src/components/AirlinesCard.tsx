import Buttons from "../app/home/admin/airlines/[id]/Buttons";

function AirlinesCard({ airlines }: { airlines: any }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-2">
        <h2 className="font-bold text-xl">{airlines.name}</h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {airlines.id}
        </span>
      </div>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Codigo IATA:</span> {airlines.iata_code}
      </p>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Logo:</span> {airlines.logo_url}
      </p>

      <div className="border-t border-gray-200 pt-4">
        <Buttons id={airlines.id} />
      </div>
    </div>
  );
}

export default AirlinesCard;
