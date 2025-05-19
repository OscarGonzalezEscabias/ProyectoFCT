import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-6">
      <h1 className="text-xl font-bold">TusViajes+</h1>

      <ul className="flex gap-x-4 text-lg">
        {!session?.user ? (
          <>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
            <li>
              <Link href="/auth/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/home">Home</Link>
            </li>
            <li>
              <Link href="/home/users">Usuarios</Link>
            </li>
            <li>
              <Link href="/home/hotels">Hoteles</Link>
            </li>
            <li>
              <Link href="/home/reservation">Reservas</Link>
            </li>
            <li>
              <Link href="/api/auth/signout">Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}


export default Navbar;