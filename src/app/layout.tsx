import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";

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
        <Providers>
          <main className="flex-grow container mx-auto px-4 flex flex-col">
            {children}
          </main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
