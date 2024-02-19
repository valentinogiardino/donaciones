import {MercadoPagoConfig, Payment} from "mercadopago";
import { NextRequest } from "next/server";
import {createClient} from "@supabase/supabase-js"

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET!)

export async function POST(request:NextRequest) {
    // const secret = request.headers.get("x-signature-id");
    // if(secret !== process.env.MP_WH_SECRET) return Response.json({success: false})
    
    const body = await request.json().then(data => data as {data: {id: string}})
    const payment = await new Payment(client).get({id: body.data.id})
    console.log('payment:', payment)

    const donation = {
        id: payment.id,
        amount: payment.transaction_amount,
        message: payment.description
    }

    const result = await supabase
    .from('donations')
    .insert(donation)

    console.log("result: ", result)

    return Response.json({success: true})
}

// export async function GET() {
//     const donation = {
//         id: 1234,
//         amount: 300,
//         message: "prueba"
//     }

//     const result = await supabase
//     .from('donations')
//     .insert(donation)
    
//     console.log("result: ", result)

//     return Response.json({success: true})
// }