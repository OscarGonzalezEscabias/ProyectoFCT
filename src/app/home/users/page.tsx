import axios from "axios"
import UserCard from "@/components/UserCard"

async function LoadUsers() {
    const { data } = await axios.get("http://localhost:3000/api/users")
    return data
}

async function UsersPage() {
    const data = await LoadUsers()
    console.log(data)

  return (
    <div className="flex flex-col gap-4">
        <h1 className="text-white">Users</h1>
        {data.map((user: any) => (
            <UserCard key={user.id} user={user}/>
        ))}
    </div>
  )
}

export default UsersPage