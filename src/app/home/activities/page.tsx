import axios from "axios";
import ActivitiesCard from "@/components/cards/AcitivitesCard";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function LoadActivities() {
  const { data } = await axios.get("http://localhost:3000/api/activities");
  return data;
}

async function ActivitiesPage() {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user as { id: number; role: string; name: string };
  const data = await LoadActivities();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-3xl">Actividades</h1>
        {currentUser?.role === "ADMIN" && (
          <Link href="/home/activities/add">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Crear actividad
            </button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((activity: any) => (
          <ActivitiesCard key={activity.id} activities={activity} />
        ))}
      </div>
    </div>
  );
}

export default ActivitiesPage;
