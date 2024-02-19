import type {Metadata} from "next";
import Link from "next/link"
import "../globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Donancy",
  description: "Envía donaciones a Valentino Giardino",
};

export default function HeaderLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es">
      
      <body className="dark container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] bg-background px-4 font-sans antialiased">
        <header className="text-xl font-bold leading-[4rem]">
          <Link href="/">Donancy</Link>
        </header>
        <main className="py-8">
          {children}
        </main>
        <Toaster position="bottom-right" reverseOrder/>
        <footer className="text-center leading-[4rem] opacity-70">
          © {new Date().getFullYear()} Donancy
        </footer>
      </body>
    </html>
  );
}
