import Buttons from "../../app/home/admin/rooms/[id]/Buttons";

function RoomsCard({ room }: { room: any }) {
  if (!room) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full max-w-md">
      {room.image ? (
        <img
          src={`/images/rooms/${room.image}`}
          alt={room.name || "Habitación"}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          Sin imagen
        </div>
      )}

      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {room.name || "Nombre no disponible"}
        </h2>

        <p className="text-gray-600 text-sm mb-2">
          {room.description || "Descripción no disponible"}
        </p>

        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Capacidad:</span> {room.capacity}{" "}
          personas
        </p>

        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Precio:</span> {room.price} €
        </p>

        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <Buttons id={room.id.toString()} />
        </div>
      </div>
    </div>
  );
}

export default RoomsCard;
