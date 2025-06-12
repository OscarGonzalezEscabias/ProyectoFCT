import NextAuth , { type NextAuthOptions }from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import db from "@/libs/mysql";
import bcrypt from "bcrypt";

interface CustomUser {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
}

export const authOptions : NextAuthOptions = {
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


                console.log(userFound[0]);
                return {
                    id: userFound[0].id,
                    name: userFound[0].username,
                    email: userFound[0].email,
                    role: userFound[0].role
                } as CustomUser;
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
        error: "/auth/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    jwt: {
        maxAge: 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.user = {
                id: token.id,
                name: token.name,
                email: token.email,
                role: token.role
            };
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }