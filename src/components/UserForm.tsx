"use client"
import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

function UserForm() {

    const searchParams = useSearchParams();
    const from = searchParams.get('from'); 


    const [user, setUser] = useState({
        username: "",
        email: "",
        userpassword: "",
        confirmPassword: "",
        role: "USER" 
    })

    const router = useRouter()
    const params = useParams()
    const { data: session, status } = useSession();
    const currentUser = session?.user as { id: number; role: string; name: string };

    const form = useRef<HTMLFormElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (user.userpassword !== user.confirmPassword) {
            alert("Passwords do not match")
            return
        }

        if (!params.id) {
            const response = await axios.post("/api/users/add", user)
            console.log(response)
            form.current?.reset()
        } else {
            const response = await axios.put(`/api/users/edit/${params.id}`, user)
            console.log(response)
            form.current?.reset()
        }

        if(from === "profile"){
            router.push(`/home/profile/${params.id}`)
        }else{
            router.push("/home/admin/users")
        }
    }

    useEffect(() => {
        if (params.id) {
            const response = axios.get(`/api/users/${params.id}`)
            response.then((res) => {
                setUser(res.data)
            })
        }
    }, [params.id])

    return (
        <form onSubmit={handleSubmit} ref={form} className='flex flex-col gap-2 bg-white p-4 rounded-lg justify-center w-1/4'>
            <label htmlFor="username" className='text-gray-700'>Username</label>
            <input type="text" name="username" id="username" onChange={handleChange} value={user.username} className='border border-gray-300 rounded-lg p-2' />

            <label htmlFor="email" className='text-gray-700'>Email</label>
            <input type="email" name="email" id="email" onChange={handleChange} value={user.email} className='border border-gray-300 rounded-lg p-2' />

            <label htmlFor="userpassword" className='text-gray-700'>Password</label>
            <input type="password" name="userpassword" id="userpassword" onChange={handleChange} className='border border-gray-300 rounded-lg p-2' />

            <label htmlFor="confirmPassword" className='text-gray-700'>Confirm Password</label>
            <input type="password" name="confirmPassword" id="confirmPassword" onChange={handleChange} className='border border-gray-300 rounded-lg p-2' />

            {currentUser?.role === "ADMIN" && (
                <div>
                    <label htmlFor="role" className='text-gray-700'>Role</label>
                    <select name="role" onChange={handleChange} value={user.role} className='border border-gray-300 rounded-lg p-2'>
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>
            )}

            <button type="submit" className='bg-blue-500 text-white p-2 rounded-lg cursor-pointer'>{params.id ? "Editar" : "Añadir"}</button>
        </form>
    )
}

export default UserForm