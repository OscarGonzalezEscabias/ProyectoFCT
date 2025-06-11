import axios from "axios"
import UserCard from "@/components/UserCard"
import Link from "next/link"

async function LoadUsers() {
  const { data } = await axios.get("http://localhost:3000/api/users")
  return data
}

async function UsersPage() {
  const data = await LoadUsers()
  console.log(data)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-3xl">Usuarios</h1>
        <Link href="/home/users/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Crear usuario
          </button>
        </Link>
      </div>

      {data.map((user: any) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>

  )
}

export default UsersPage