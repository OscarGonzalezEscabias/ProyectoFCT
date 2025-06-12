import axios from "axios";
import ActivitiesCard from "@/components/AcitivitesCard";
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
  console.log(data);

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

      {data.map((activitie: any) => (
        <ActivitiesCard key={activitie.id} activities={activitie} />
      ))}
    </div>
  );
}

export default ActivitiesPage;
