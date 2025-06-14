import axios from "axios";
import RoomsCard from "@/components/cards/RoomsCard";
import Link from "next/link";

async function LoadRooms() {
  const { data } = await axios.get("http://localhost:3000/api/rooms");
  return data;
}

async function RoomsPage() {
  const data = await LoadRooms();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-3xl">Habitaciones</h1>
        <Link href="/home/admin/rooms/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Crear habitación
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((room: any) => (
          <RoomsCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}

export default RoomsPage;
