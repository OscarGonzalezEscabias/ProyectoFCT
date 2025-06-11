import Buttons from "../app/home/admin/rooms/[id]/Buttons";

function RoomsCard({ rooms }: { rooms: any }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-2">
        <h2 className="font-bold text-xl">{rooms.name}</h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {rooms.id}
        </span>
      </div>

      <p className="text-gray-600 mb-2">{rooms.description}</p>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Capacidad:</span> {rooms.capacity} personas
      </p>

      <p className="text-gray-700 mb-4">
        <span className="font-semibold">Precio:</span> {rooms.price} €
      </p>

      <div className="border-t border-gray-200 pt-4">
        <Buttons id={rooms.id} />
      </div>
    </div>
  );
}

export default RoomsCard;
