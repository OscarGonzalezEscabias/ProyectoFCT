import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-6 shadow-md">
      <h1 className="text-2xl font-extrabold tracking-wide">TusViajes+</h1>
      <ul className="flex gap-x-6 text-lg items-center">
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
                href="/home/users"
                className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Usuarios
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
                href="/home/reservation"
                className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Reservas
              </Link>
            </li>
            <li>
              <Link
                href="/api/auth/signout"
                className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
