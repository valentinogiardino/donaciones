'use client'

import { Donation } from "@/interfaces/Donation"
import supabase from "@/lib/supabase"
import { useEffect, useState } from "react"
import { Toaster } from "@/components/ui/toaster"
import { toast, useToast } from "@/components/ui/use-toast"




export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Donation[]>([])
    useEffect(()=> {
        // Listen to inserts
        supabase
        .channel('donations')
        .on('postgres_changes', { event: 'INSERT', schema: "public"}, 
        (change) => {
            console.log(change);
            setNotifications((notifications)=> [...notifications, change.new as Donation])
            // const newDonation = change.new as Donation;
            // toast({
            //     title: newDonation.amount.toString(),
            //     description: newDonation.message,
            //   })
        })
        .subscribe()
    }, [])
    useEffect(()=> {
        if(notifications.length){
            const timeout = setTimeout(() =>{
            setNotifications((notifications) => notifications.slice(1));
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [notifications])

    if(!notifications.length){
        return null;
    }
    return (
        <section className="grid items-center justify-center text-center gap-4 absolute bottom-4 right-4 bg-black border p-4 rounded-md">
            <p className="text-2xl font-bold">{notifications[0].amount.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}</p>
            <p>{notifications[0].message}</p>
        </section>
    )
}
