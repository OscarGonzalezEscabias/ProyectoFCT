'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function UserProfile({ params }: { params: { id: number } }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const userId = params.id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/profile/${userId}`);
        if (!res.ok) throw new Error('No se pudo obtener el usuario');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error('Error al obtener usuario:', err);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleDelete = async () => {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/profile/${userId}/del`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      // Cierra sesión y redirige
      await signOut({ callbackUrl: '/auth/login' });
    } catch (err) {
      console.error(err);
      alert('Hubo un problema al eliminar tu cuenta');
    }
  };

  const handleEdit = () => {
    router.push(`/home/profile/${userId}/edit?from=profile`);
  };

  if (!user) return <p className="text-center mt-10">Cargando perfil...</p>;

  return (
    <div className="flex flex-col items-center mt-10 bg-white p-6 rounded-lg shadow-lg" >
      <div className="flex flex-row items-start gap-10 w-full max-w-4xl">
        <img
          src="https://via.placeholder.com/200"
          alt="Foto de perfil"
          className="rounded-xl w-52 h-52 object-cover"
        />

        <div className="flex flex-col justify-start">
          <h2 className="text-3xl font-bold mb-2">{user.username}</h2>
          <p className="text-lg text-gray-600 mb-1">{user.email}</p>
          <p className="text-md text-gray-600 italic">Rol: {user.role}</p>
        </div>
      </div>

      <div className="flex gap-4 mt-10">
        <button
          onClick={handleEdit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Editar perfil
        </button>
        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
}
