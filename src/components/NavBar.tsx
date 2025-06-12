import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileCard from "./ProfileCard";

async function Navbar() {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user as { id: number; role: string; name: string; email: string };

  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-6 shadow-md">
      <h1 className="text-2xl font-extrabold tracking-wide">TusViajes+</h1>
      <ul className="flex gap-x-6 text-lg items-center relative">
        {!session?.user ? (
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
            {currentUser.role === "ADMIN" && (
              <>
                <li>
                  <Link
                    href="/home/admin/users"
                    className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Usuarios
                  </Link>
                </li>
                <li className="relative group">
                  <button
                    className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                    type="button"
                  >
                    Reservas ▾
                  </button>
                  <ul className="absolute hidden group-hover:block bg-gray-800 rounded-md mt-2 py-2 w-40 shadow-lg z-10">
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
                  </ul>
                </li>

                <li className="relative group">
                  <button
                    className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                    type="button"
                  >
                    Gestión ▾
                  </button>
                  <ul className="absolute hidden group-hover:block bg-gray-800 rounded-md mt-2 py-2 w-40 shadow-lg z-10">
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
                </li>
              </>
            )}
            <li className="relative group">
              <button
                className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                type="button"
              >
                <ProfileCard currentUser={currentUser} />
              </button>
              <ul className="absolute hidden group-hover:block bg-gray-800 rounded-md mt-2 py-2 w-40 shadow-lg z-10">
                <li>
                  <Link
                    href="/home/admin/reservation"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Perfil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/home/admin/reservation"
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
            </li>

          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
