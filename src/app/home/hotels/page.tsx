import axios from "axios";
import HotelsCard from "@/components/HotelsCard";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function LoadHotels() {
  const { data } = await axios.get("http://localhost:3000/api/hotels");
  return data;
}

async function HotelsPage() {
  const session = await getServerSession(authOptions);
  const data = await LoadHotels();
  const currentUser = session?.user as { id: number; role: string; name: string };
  console.log(data);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-3xl">Hoteles</h1>
        {currentUser?.role === "ADMIN" && (
        <Link href="/home/hotels/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Crear hotel
          </button>
        </Link>
        )}
      </div>

      {data.map((hotel: any) => (
        <HotelsCard key={hotel.id} hotels={hotel} />
      ))}
    </div>
  );
}

export default HotelsPage;
