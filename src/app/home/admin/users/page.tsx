import axios from "axios";
import UserCard from "@/components/cards/UserCard";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function LoadUsers() {
  const { data } = await axios.get("http://localhost:3000/api/users");
  return data;
}

interface Props {
  searchParams?: { page?: string };
}

const USERS_PER_PAGE = 6;

async function UsersPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user as { id: number; role: string; name: string };
  const data = await LoadUsers();

  const page = parseInt(searchParams?.page || "1", 10);
  const totalPages = Math.ceil(data.length / USERS_PER_PAGE);
  const startIndex = (page - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const pagedUsers = data.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-3xl">Usuarios</h1>
        {currentUser?.role === "ADMIN" && (
          <Link href="/home/admin/users/add">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Crear usuario
            </button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pagedUsers.map((user: any) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <Link
          href={`/home/admin/users?page=${page - 1}`}
          className={`px-4 py-2 rounded-lg ${
            page <= 1
              ? "bg-gray-400 cursor-not-allowed pointer-events-none"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Anterior
        </Link>

        <span className="text-white">
          Página {page} de {totalPages}
        </span>

        <Link
          href={`/home/admin/users?page=${page + 1}`}
          className={`px-4 py-2 rounded-lg ${
            page >= totalPages
              ? "bg-gray-400 cursor-not-allowed pointer-events-none"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Siguiente
        </Link>
      </div>
    </div>
  );
}

export default UsersPage;
