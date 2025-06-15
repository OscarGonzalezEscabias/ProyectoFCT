"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import ProfileCard from "./cards/ProfileCard";

export default function Navbar() {
  const { data: session, status } = useSession();

  // Cast para que currentUser tenga image opcional
  const currentUser = session?.user as {
    id: number;
    role: string;
    name: string;
    email: string;
    image?: string;
  };

  // Estados para controlar dropdowns
  const [openReservas, setOpenReservas] = useState(false);
  const [openGestion, setOpenGestion] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  // Refs para detectar click fuera y cerrar dropdowns
  const reservasRef = useRef<HTMLLIElement>(null);
  const gestionRef = useRef<HTMLLIElement>(null);
  const profileRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        reservasRef.current &&
        !reservasRef.current.contains(event.target as Node)
      ) {
        setOpenReservas(false);
      }
      if (
        gestionRef.current &&
        !gestionRef.current.contains(event.target as Node)
      ) {
        setOpenGestion(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpenProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-6 shadow-md">
      <h1 className="text-2xl font-extrabold tracking-wide">TusViajes+</h1>
      <ul className="flex gap-x-6 text-lg items-center relative">
        {!session ? (
          <>
            <li>
              <Link
                href="/auth/login"
                className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/auth/register"
                className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/home"
                className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/home/hotels"
                className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Hoteles
              </Link>
            </li>
            <li>
              <Link
                href="/home/flights"
                className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Vuelos
              </Link>
            </li>
            <li>
              <Link
                href="/home/activities"
                className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Actividades
              </Link>
            </li>
            <li>
              <Link
                href="/home/travels"
                className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Viajes
              </Link>
            </li>
            {currentUser?.role === "ADMIN" && (
              <>
                <li>
                  <Link
                    href="/home/admin/users"
                    className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Usuarios
                  </Link>
                </li>

                {/* Dropdown Reservas */}
                <li
                  ref={reservasRef}
                  className="relative"
                >
                  <button
                    onClick={() => setOpenReservas(!openReservas)}
                    className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                    type="button"
                  >
                    Reservas ▾
                  </button>
                  {openReservas && (
                    <ul className="absolute bg-gray-800 rounded-md mt-2 py-2 w-40 shadow-lg z-10">
                      <li>
                        <Link
                          href="/home/admin/reservation"
                          className="block px-4 py-2 hover:bg-gray-700"
                        >
                          Hoteles
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/home/admin/flight-reservation"
                          className="block px-4 py-2 hover:bg-gray-700"
                        >
                          Aviones
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/home/admin/activities-reservation"
                          className="block px-4 py-2 hover:bg-gray-700"
                        >
                          Actividades
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/home/admin/travels"
                          className="block px-4 py-2 hover:bg-gray-700"
                        >
                          Viajes
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                {/* Dropdown Gestión */}
                <li
                  ref={gestionRef}
                  className="relative"
                >
                  <button
                    onClick={() => setOpenGestion(!openGestion)}
                    className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                    type="button"
                  >
                    Gestión ▾
                  </button>
                  {openGestion && (
                    <ul className="absolute bg-gray-800 rounded-md mt-2 py-2 w-40 shadow-lg z-10">
                      <li>
                        <Link
                          href="/home/admin/rooms"
                          className="block px-4 py-2 hover:bg-gray-700"
                        >
                          Habitaciones
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/home/admin/airports"
                          className="block px-4 py-2 hover:bg-gray-700"
                        >
                          Aeropuertos
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/home/admin/airlines"
                          className="block px-4 py-2 hover:bg-gray-700"
                        >
                          Aerolineas
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/home/admin/aircrafts"
                          className="block px-4 py-2 hover:bg-gray-700"
                        >
                          Aviones
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/home/admin/flight_seats"
                          className="block px-4 py-2 hover:bg-gray-700"
                        >
                          Asientos
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            )}

            {/* Dropdown Perfil */}
            <li
              ref={profileRef}
              className="relative"
            >
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer flex items-center"
                type="button"
              >
                <ProfileCard currentUser={currentUser} />
              </button>
              {openProfile && (
                <ul className="absolute bg-gray-800 rounded-md mt-2 py-2 w-40 shadow-lg z-10">
                  <li>
                    <Link
                      href={`/home/profile/${currentUser.id}`}
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/home/profile/${currentUser.id}/my-reservations`}
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Mis reservas
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/api/auth/signout"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
