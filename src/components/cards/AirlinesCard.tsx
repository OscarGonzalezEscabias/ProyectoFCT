import Buttons from "../../app/home/admin/airlines/[id]/Buttons";

function AirlinesCard({ airline }: { airline: any }) {
  if (!airline) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full max-w-md">
      {airline.logo_url ? (
        <img
          src={`/images/airlines/${airline.logo_url}`}
          alt={airline.name || "Aerolinea"}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          Sin logo
        </div>
      )}

      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {airline.name || "Nombre no disponible"}
        </h2>

        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Código IATA:</span> {airline.iata_code}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <Buttons id={airline.id.toString()} />
        </div>
      </div>
    </div>
  );
}

export default AirlinesCard;
