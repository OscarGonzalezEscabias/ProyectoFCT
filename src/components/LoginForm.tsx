"use client"

import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useRef } from "react"

function LoginForm() {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const router = useRouter()
    const form = useRef<HTMLFormElement>(null)

    const onSubmit = handleSubmit(async (data: any) => {

        console.log(data)

        const response = await signIn("credentials", {
            email: data.email,
            userpassword: data.userpassword,
            redirect: false
        })

        console.log(response)


        if (response?.error) {
            alert("Invalid credentials")
        } else {
            form.current?.reset()
            router.push("/home/users")
        }

    })

    return (
        <form onSubmit={onSubmit} ref={form} className='flex flex-col gap-2 bg-white p-4 rounded-lg justify-center w-1/4'>

            <h1 className="text-2xl font-bold">Login</h1>

            <label htmlFor="email" className='text-gray-700'>Email</label>
            <input type="text" className='border border-gray-300 rounded-lg p-2' {...register("email", { required: true })} />

            {errors.email && <p className="text-red-500 text-xs">Email is required</p>}

            <label htmlFor="password" className='text-gray-700'>Password</label>
            <input type="password" className='border border-gray-300 rounded-lg p-2' {...register("userpassword", { required: true })} />

            {errors.userpassword && <p className="text-red-500 text-xs">Password is required</p>}

            <button type="submit" className='bg-blue-500 text-white p-2 rounded-lg cursor-pointer'>Login</button>
        </form>
    )
}

export default LoginForm
