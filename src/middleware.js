import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {
      // Ruta protegida por rol
      if (req.nextUrl.pathname.startsWith("/home/admin") && 
          req.nextauth.token?.role !== "ADMIN") {
        return NextResponse.rewrite(new URL("/home/unauthorized", req.url));
      }
    },
    {
      callbacks: {
        authorized: ({ token }) => {
          // Todas las rutas en el matcher requieren autenticación
          return !!token;
        },
      },
    }
  );

export const config = { 
    matcher: [
        "/home/:path*",
        "/home/admin/:path*",
    ] 
}