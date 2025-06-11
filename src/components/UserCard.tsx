import Link from "next/link"

function UserCard( {user}: {user: any}) {
    return (
        <Link href={`/home/admin/users/${user.id}`} className="bg-white p-4 rounded-lg shadow-lg mb-3 hover:bg-gray-100 margin-2 items-center">
            <h2 className="font-bold text-2xl">{user.username}</h2>
            <p className="text-gray-500">{user.email}</p>
        </Link>
    )
}

export default UserCard