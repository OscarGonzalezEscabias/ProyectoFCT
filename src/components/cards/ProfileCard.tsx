"use client"
import { useSession } from "next-auth/react";

function ProfileCard({ currentUser }: { currentUser: { name: string; email: string } }) {
    return (
        <div className="flex items-center gap-4">
            <img src="https://media.istockphoto.com/id/1495088043/es/vector/icono-de-perfil-de-usuario-avatar-o-icono-de-persona-foto-de-perfil-s%C3%ADmbolo-de-retrato.jpg?s=612x612&w=0&k=20&c=mY3gnj2lU7khgLhV6dQBNqomEGj3ayWH-xtpYuCXrzk=" className="w-12 h-12 rounded-full"/>
            <div className="flex flex-col">
                <h1 className="text-lg font-bold">{currentUser?.name}</h1>
                <p className="text-gray-500">{currentUser?.email}</p>
            </div>
        </div>
    );
}

export default ProfileCard
