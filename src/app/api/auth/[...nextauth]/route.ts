import NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import db from "@/libs/mysql";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                userpassword: { label: "Password", type: "password" },
            },
            async authorize(credentials : any, req : any) {
                const userFound : any = await db.query("SELECT * FROM users WHERE email = ?", [credentials?.email])

                if (!userFound[0]) {
                    throw new Error("User not found")
                }

                const matchPassword = await bcrypt.compare(credentials?.userpassword, userFound[0].userpassword)

                if (!matchPassword) {
                    throw new Error("Invalid password")
                }

                return {
                    id: userFound[0].id,
                    username: userFound[0].username,
                    email: userFound[0].email
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
        error: "/auth/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }