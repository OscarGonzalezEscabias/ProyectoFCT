import axios from "axios"
import Buttons from "./Buttons"

async function LoadUser(id: string) {
    const { data } = await axios.get(`http://localhost:3000/api/users/${id}`)
    return data
}

async function UserPage({params}: {params: {id: string}}) {
    const id = params.id
    const user = await LoadUser(id)
    console.log(user)
    return (
        <section className="flex items-center justify-center h-full">
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4 items-center justify-center">
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <p className="text-gray-500">{user.email}</p>

                <Buttons id={id}/>
            </div>
        </section>
    )
}

export default UserPage