"use client"

import axios from "axios"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useRef } from "react"

function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()
    const form = useRef<HTMLFormElement>(null)

    const onSubmit = handleSubmit(async (data: any) => {

        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match")
            return
        }

        const formData = new FormData()
        formData.append("username", data.username)
        formData.append("email", data.email)
        formData.append("userpassword", data.password)

        // Aquí NO añadimos imagen, el usuario no tiene que subirla
        // Si más adelante quieres añadir input tipo file, podrías poner:
        // if(data.image?.length > 0) formData.append("image", data.image[0])

        try {
            const response = await axios.post("/api/users/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            if (response.status === 200) {
                form.current?.reset()
                router.push("/auth/login")
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400 && error.response.data.error) {
                    alert("Este usuario ya esta registrado") // Por ejemplo "User already exists" o "Email already exists"
                } else {
                    alert("Error inesperado, inténtalo más tarde.")
                }
            } else {
                alert("Error desconocido")
            }
        }
    })

    return (
        <form onSubmit={onSubmit} ref={form} className='flex flex-col gap-2 bg-white p-4 rounded-lg justify-center w-1/4'>

            <h1 className="text-2xl font-bold">Registro</h1>

            <label htmlFor="username" className='text-gray-700'>Username</label>
            <input type="text" className='border border-gray-300 rounded-lg p-2' {...register("username", { required: true })} />
            {errors.username && <p className="text-red-500 text-xs">Username is required</p>}

            <label htmlFor="email" className='text-gray-700'>Email</label>
            <input type="email" className='border border-gray-300 rounded-lg p-2' {...register("email", { required: true })} />
            {errors.email && <p className="text-red-500 text-xs">Email is required</p>}

            <label htmlFor="password" className='text-gray-700'>Password</label>
            <input type="password" className='border border-gray-300 rounded-lg p-2' {...register("password", { required: true })} />
            {errors.password && <p className="text-red-500 text-xs">Password is required</p>}

            <label htmlFor="confirmPassword" className='text-gray-700'>Confirm Password</label>
            <input type="password" className='border border-gray-300 rounded-lg p-2' {...register("confirmPassword", { required: true })} />
            {errors.confirmPassword && <p className="text-red-500 text-xs">Confirm Password is required</p>}

            <button type="submit" className='bg-blue-500 text-white p-2 rounded-lg cursor-pointer'>Registrar</button>
        </form>
    )
}

export default RegisterForm
