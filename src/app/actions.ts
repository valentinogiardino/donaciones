import { Donation } from "@/interfaces/Donation";
import mercadopago from "@/lib/mercadopago";
import supabase from "@/lib/supabase";
import { randomInt } from "crypto";
import MercadoPagoConfig, { Preference } from "mercadopago"
import { redirect } from "next/navigation"


export async function donate(formaData:FormData) {
    'use server'
    const client = mercadopago

    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: 'donacion',
            title: formaData.get("message") as string,
            quantity: 1,
            unit_price: Number(formaData.get("amount"))
          }
        ],
      }
    })
    
    
    redirect(preference.sandbox_init_point!)
  }

export async function getDonations() {
    const donations = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({data})=> data as unknown as Promise<Donation[]>);
        console.log(donations)
    return donations
}