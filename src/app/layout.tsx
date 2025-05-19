import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Proyecto FCT",
  description: "Proyecto FCT",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + " flex flex-col min-h-screen"}>
        <NavBar />
        <main className="flex-grow container mx-auto px-4 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
