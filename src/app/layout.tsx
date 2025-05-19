import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Proyecto FCT",
    description: "Proyecto FCT",
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar/>
        <div className="h-[calc(100vh-5rem)] container mx-auto">{children}</div>
      </body>
    </html>
  );
}
