"use client";

import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  image?: string;
  id: number;
}

function ProfileCard({ currentUser }: { currentUser: User }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/profile/${currentUser.id}`);
        if (!res.ok) throw new Error("Error al obtener usuario");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    }

    if (currentUser.id) {
      fetchUser();
    }
  }, [currentUser.id]);

  const defaultImage =
    "https://media.istockphoto.com/id/1495088043/es/vector/icono-de-perfil-de-usuario-avatar-o-icono-de-persona-foto-de-perfil-s%C3%ADmbolo-de-retrato.jpg?s=612x612&w=0&k=20&c=mY3gnj2lU7khgLhV6dQBNqomEGj3ayWH-xtpYuCXrzk=";

  return (
    <div className="flex items-center gap-4">
      <img
        src={
          user?.image ? `/images/users/${user.image}` : defaultImage
        }
        alt="Foto de perfil"
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h1 className="text-lg font-bold">{currentUser.name}</h1>
        <p className="text-gray-500">{currentUser.email}</p>
      </div>
    </div>
  );
}

export default ProfileCard;
