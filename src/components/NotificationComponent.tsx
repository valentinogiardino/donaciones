'use client'

import { Donation } from "@/interfaces/Donation";
import supabase from "@/lib/supabase";
import { toLocalCurrency } from "@/lib/utils";
import { BellRing } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function NotificationComponent() {
    const [notifications, setNotifications] = useState<Donation[]>([])
    useEffect(()=> {
        // Listen to inserts
        supabase
        .channel('donations')
        .on('postgres_changes', { event: 'INSERT', schema: "public"}, 
        (change) => {
            console.log(change);
            setNotifications((notifications)=> [...notifications, change.new as Donation])
            const newDonation = change.new as Donation;
            // toast({
            //     title: newDonation.amount.toString(),
            //     description: newDonation.message,
            //   })
            toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                  } max-w-md w-full bg-gray-800 rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                  <div className="flex-1 w-0 p-3">
                    <div className="flex items-center text-center">
                      <div className="flex-shrink-0 pt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell text-red-400"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                      </div>
                      <div className="ml-2 flex-1">
                        <p className="text-lg font-medium">
                          {toLocalCurrency(newDonation.amount)}
                        </p>
                        <p className="mt-1">
                          {newDonation.message}
                        </p>
                      </div>
                      {/* <div className="ml-2 flex-1">
                        <p className="text-sm text-gray-400">
                            {new Date(newDonation.created_at).toLocaleString()}
                        </p>
                      </div> */}
                    </div>
                  </div>
                  <div className="flex border-l border-gray-200">
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-sky-500 hover:text-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              ))
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
        // <section className="grid items-center justify-center text-center gap-4 absolute bottom-4 right-4 bg-black border p-4 rounded-md">
        //     <p className="text-2xl font-bold">{notifications[0].amount.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}</p>
        //     <p>{notifications[0].message}</p>
        // </section>
        <div></div>
    )
}

export default NotificationComponent