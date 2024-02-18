import { TableDonations } from "@/components/TableDonations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Donation } from "@/interfaces/Donation";
import { createClient } from "@supabase/supabase-js";
import { MercadoPagoConfig, Preference } from 'mercadopago';
import Link from "next/link";
import { redirect } from "next/navigation";
import { donate, getDonations } from "./actions";
import NotificationsPage from "./notifications/page";

export const revalidate = 0

export default async function HomePage() {

  const donations = await getDonations();

  return (
    <section className="dark container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] bg-background px-4 font-sans antialiased">
      <header className="text-xl font-bold leading-[4rem]">
      <Link href="/">donancy</Link>
    </header>
    <main className="py-8">
      <section className="grid gap-12">
        <form action={donate} className="grid col-12 gap-8 border p-4 max-w-96 m-auto">
          <Label className="grid gap-2" >
            <span>Valor</span>
          </Label>
          <Input type="number" name="amount" />
          <Label className="grid gap-2">
            <span>Tu mensaje en la donación</span>
            <Textarea name="message"/>
          </Label>
          <Button type="submit">Enviar</Button>
        </form>
        <TableDonations donations={donations}/>
      </section>
    </main>
    <footer className="text-center leading-[4rem] opacity-70">
      © {new Date().getFullYear()} donancy
    </footer>
    <NotificationsPage />
    </section>
    
  );
}
