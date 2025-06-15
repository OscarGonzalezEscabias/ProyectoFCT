'use client'
import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

function UserForm() {
    const searchParams = useSearchParams()
    const from = searchParams.get('from')

    const [user, setUser] = useState({
        username: "",
        email: "",
        userpassword: "",
        confirmPassword: "",
        role: "USER",
        image: "" // <-- añadimos campo imagen (nombre o url)
    })

    const router = useRouter()
    const params = useParams()
    const { data: session, status } = useSession()
    const currentUser = session?.user as { id: number; role: string; name: string }

    const form = useRef<HTMLFormElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    // Cuando cambia la imagen seleccionada por input file
    useEffect(() => {
        if (!file) {
            // Si no hay archivo nuevo seleccionado, mostrar la imagen actual
            if (user.image) {
                // Asumiendo que la ruta pública es /images/users/ + nombre archivo
                setPreview(`/images/users/${user.image}`)
            } else {
                setPreview(null)
            }
            return
        }
        // Si hay un archivo nuevo seleccionado, crear url temporal para preview
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [file, user.image])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setFile(null)
            return
        }
        setFile(e.target.files[0])
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (user.userpassword !== user.confirmPassword) {
            alert("Passwords do not match")
            return
        }

        const formData = new FormData()
        formData.append("username", user.username)
        formData.append("email", user.email)
        formData.append("userpassword", user.userpassword)
        formData.append("role", user.role)
        if (file) {
            formData.append("image", file)
        } else if (user.image) {
            // Enviar nombre imagen actual para mantenerla si no se cambia
            formData.append("currentImage", user.image)
        }

        try {
            let response
            if (!params.id) {
                response = await axios.post("/api/users/add", formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            } else {
                response = await axios.put(`/api/users/edit/${params.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            }
            console.log(response)
            form.current?.reset()
            setFile(null)
        } catch (error) {
            console.error(error)
            alert('Error al guardar el usuario')
            return
        }

        if (from === "profile") {
            router.push(`/home/profile/${params.id}`)
        } else {
            router.push("/home/admin/users")
        }
    }

    // Cargar datos usuario para editar
    useEffect(() => {
        if (params.id) {
            axios.get(`/api/users/${params.id}`)
                .then((res) => {
                    setUser({
                        ...res.data,
                        userpassword: "", // vaciar password por seguridad
                        confirmPassword: "",
                        image: res.data.image || "" // asegurarse que hay campo image con nombre/url
                    })
                    // El preview se actualizará automáticamente por el useEffect que depende de user.image y file
                })
                .catch(() => {
                    alert("Error cargando usuario.")
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

            <label className='text-gray-700'>Foto de perfil</label>
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded w-fit"
            >
                Elegir archivo
            </button>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            {preview && (
                <img
                    src={preview}
                    alt="Vista previa"
                    className="w-full h-48 object-cover rounded border mt-2"
                />
            )}

            <button type="submit" className='bg-blue-500 text-white p-2 rounded-lg cursor-pointer'>{params.id ? "Editar" : "Añadir"}</button>
        </form>
    )
}

export default UserForm
