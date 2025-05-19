"use client"
import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter, useParams } from 'next/navigation'

function UserForm() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        userpassword: "",
        confirmPassword: ""
    })

    const router = useRouter()
    const params = useParams()

    const form = useRef<HTMLFormElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        router.push("/home/users")
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

            <button type="submit" className='bg-blue-500 text-white p-2 rounded-lg cursor-pointer'>{params.id ? "Editar" : "Añadir"}</button>
        </form>
    )
}

export default UserForm